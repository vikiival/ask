import { Codec } from "../../deps";
import { Crypto } from "../../primitives/crypto";
import { CallInput, IKey } from "./backend";

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

export class CallInputBuilder implements CallInput {
    static fnSelctor(name: string): u8[] {
        // FIXME(liangqin) the generate value is not consisted with native version.....
        return Crypto.blake256s(name).toU8a().slice(0, 4);
    }

    static encodeArgs(args: Codec[]): u8[] {
        let data = new Array<u8>();
        for (let i = 0; i < args.length; i++) {
            data = data.concat(args[i].toU8a());
        }
        return data;
    }

    constructor(
        private readonly name: string,
        private readonly args: Codec[]
    ) {}

    functionSelctor(): u8[] {
        return CallInputBuilder.fnSelctor(this.name);
    }
    arguments(): u8[] {
        return CallInputBuilder.encodeArgs(this.args);
    }
    toU8a(): u8[] {
        // TODO: find a wat to opt array copy
        return this.functionSelctor().concat(this.arguments());
    }
    encodedLength(): i32 {
        return this.toU8a().length;
    }
    populateFromBytes(bytes: u8[], index: i32): void {
        throw new Error("Method not implemented.");
    }

    eq(other: CallInputBuilder): bool {
        if (this.name != other.name) {
            return false;
        }

        let argsA = this.args;
        let argsB = other.args;
        if (argsA.length != argsB.length) {
            return false;
        }
        for (let i = 0; i < argsA.length; i++) {
            if (argsA[i] != argsB[i]) {
                return false;
            }
        }
        return true;
    }
    notEq(other: CallInputBuilder): bool {
        return !this.eq(other);
    }

    @inline
    @operator("==")
    static eq(a: CallInputBuilder, b: CallInputBuilder): bool {
        return a.eq(b);
    }

    @inline
    @operator("!=")
    static notEq(a: CallInputBuilder, b: CallInputBuilder): bool {
        return a.notEq(b);
    }
}

export class Void implements Codec {
    toU8a(): u8[] {
       return new Array<u8>(0);
    }
    encodedLength(): i32 {
        return 0;
    }
    populateFromBytes(bytes: u8[], index: i32): void {}

    eq(other: Void): bool {
        return true;
    }

    notEq(other: Codec): bool {
        return false;
    }

    @inline
    @operator("==")
    static eq(a: Void, b: Void): bool {
        return true;
    }

    @inline
    @operator("!=")
    static notEq(a: Void, b: Void): bool {
        return false;
    }
}