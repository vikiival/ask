import { Transform } from "assemblyscript/cli/transform";
import { Parser, Module, Program, NodeKind } from "assemblyscript";
// import { Source, Statement, DeclarationStatement, ClassDeclaration } from 'assemblyscript';

// import * as preprocess from './preprocess';
// import {getContractInfo} from './contract';


// import * as visitor from 'visitor-as';


export class AskTransform extends Transform {
    afterParse(parser: Parser): void {
        this.log("[ask] afterInitialize called");
    }

    afterInitialize(program: Program) {
        let source = program.sources[0];
        // let info = getContractInfo(program);
        // preprocess.outputAbi(info);
        // let out = preprocess.outputCode(source.text, info);
        // this.writeFile("extension.ts", out, __dirname)
        this.log("[ask] afterInitialize called");
    // let elements = program.elementsByName;
    // elements.forEach(element => this.log("  " + element.internalName + " [" + ElementKind[element.kind] + "]"));
    }

    afterCompile(_module: Module): void {}
}


// function transformSource(source: Source) {
//   // TODO: filter source by file name
//   preprocess.outputCode(source.text)
// }

// function transformStatement(stmt: Statement) {
//   if (stmt.kind == NodeKind.CLASSDECLARATION) {
//     let classStmt = stmt as ClassDeclaration
//   }
// }