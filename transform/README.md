# Transform

```sh
npx asc ./examples/solar/solar.ts --transform ./transform/index.js  --noEmit
```

注意： 由于 asc 实现的似乎有导入问题， 需要使用 transform 下的 asc，即 ./transform/node_modules/assemblyscript/bin/asc
