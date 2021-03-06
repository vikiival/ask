# Transform

对 `ask` 智能合约代码做预处理，生成可直接编译为 wasm 的 as 智能合约代码。

## Example

```sh
npx asc ../examples/solar/solar.ts --transform ./index.js  --noEmit
```

注意： 由于 asc 实现的似乎有导入重复问题， 需要使用 transform 下的 asc，即 ./transform/node_modules/assemblyscript/bin/asc
