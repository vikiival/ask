import { IKey } from "./backend";

export * from "./backend";
export * from "./onchain";

export class Key implements IKey {
    constructor(readonly key: u64[]) {}
    to_bytes(): ArrayBuffer {
        return this.key.buffer;
    }

    static fromArrayU64(key: u64[]): Key {
        return new Key(key);
    }
}