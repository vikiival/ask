const { Transform } = require("assemblyscript/cli/transform");
const preprocess = require('./preprocess');
const {getContractInfo} = require('./dist/contract');

class MyTransform extends Transform {
    afterInitialize(program) {
    // TODO: support cli args, see https://github.com/AssemblyScript/assemblyscript/issues/1691
        let source = program.sources[0];
        // TODO: make sure the semantics
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
        // TODO: config
        this.writeFile("target/extension.ts", out, __dirname);
        this.writeFile("target/metadata.json", abi, __dirname);
    }  
}

module.exports = MyTransform;