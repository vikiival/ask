const { Transform } = require("assemblyscript/cli/transform");
const { SourceKind, ElementKind } = require("assemblyscript");
const preprocess = require('./preprocess');
const {getContractInfo} = require('./dist/src/contract');

class MyTransform extends Transform {
    afterInitialize(program) {
    // TODO: support cli args
        this.log("[ask] afterInitialize called");
        let source = program.sources[0];
        for (let src of program.sources) {
            if (src.sourceKind === 1 && src.simplePath !== "index-incremental") {
                source = src;
                break;
            }
        }
        let info = getContractInfo(program);
        let abi = preprocess.outputAbi(info);
        let out = preprocess.outputCode(source.text, info);
        this.log(source.normalizedPath);
        // this.writeFile("original.ts", source.text, __dirname); 
        this.writeFile("target/extension.ts", out, __dirname);
        this.writeFile("target/metadata.json", abi, __dirname);
    }  
}

module.exports = MyTransform;