import Handlebars from "./handlebars";
import { Range } from "assemblyscript";
import { ContractProgram } from "../contract";
import { mainTpl, storeTpl, eventTpl, dynamicTpl} from "../tpl";

export class ModifyPoint {
    range: Range;
    mode: ModifyType;
    code: string;

    constructor(range: Range, mode: ModifyType, code: string) {
        this.range = range;
        this.mode = mode;
        this.code = code;
    }
}

export enum ModifyType {
    REPLACE,
    INSERT,
    TOP,
    APPEND
}
export class SourceModifier {
    modifyPoints: ModifyPoint[] = [];
    fileExtMap: Map<string, ModifyPoint[]> = new Map();

    public addModifyPoint(point: ModifyPoint): void {
        this.modifyPoints.push(point);
    }
 
    public toModifyFileMap(): void {
        this.modifyPoints.forEach(item => {
            let path = item.range.source.normalizedPath;
            if (this.fileExtMap.has(path)) {
                this.fileExtMap.get(path)!.push(item);
            } else {
                this.fileExtMap.set(path, [item]);
            }
        });
    }
}


// Write text (also fallback)
export function getExtCodeInfo(contractInfo: ContractProgram): SourceModifier {
    let sourceModifier = new SourceModifier();
    if (!contractInfo.contract) {
        throw Error("Not found annotation @contract that indicate contract!");
    }
    const render = Handlebars.compile(mainTpl);
    const exportMain = render(contractInfo);

    contractInfo.contract.msgFuncDefs.forEach(item => {
        if (item.messageDecorator.mutates == "false") {
            let body = item.bodyRange.toString();
            body = body.replace(/{/i, "{\n  _lang.Storage.mode = _lang.StoreMode.R;");
            sourceModifier.addModifyPoint(new ModifyPoint(item.bodyRange, ModifyType.REPLACE, body));
           
        }
    });

    for (let index = 0; index < contractInfo.storages.length; index++) {
        let store = Handlebars.compile(storeTpl)(contractInfo.storages[index]);
        sourceModifier.addModifyPoint(new ModifyPoint(contractInfo.storages[index].range, ModifyType.REPLACE, store));
    }
    contractInfo.events.forEach(event => {
        let code = Handlebars.compile(eventTpl)(event);
        sourceModifier.addModifyPoint(new ModifyPoint(event.range, ModifyType.REPLACE, code));
    });

    contractInfo.dynamics.forEach(dynamic => {
        let code = Handlebars.compile(dynamicTpl)(dynamic);
        sourceModifier.addModifyPoint(new ModifyPoint(dynamic.range, ModifyType.REPLACE, code));
    });
    sourceModifier.addModifyPoint(new ModifyPoint(contractInfo.contract.range, ModifyType.APPEND, exportMain));
    sourceModifier.toModifyFileMap();
    return sourceModifier;
}

export function getAbiInfo(abiInfo: ContractProgram): string {
    let metadata = JSON.stringify(abiInfo.metatdata.toMetadata(), null, 2);
    console.log(`metadata: ${metadata}`);
    return metadata;
}