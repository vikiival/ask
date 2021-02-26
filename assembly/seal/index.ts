import { Codec } from "../deps";
import { ReturnCode } from "../primitives/alias";
import { ReadBuffer } from "../primitives/readbuffer";
import {
    seal_clear_storage,
    seal_gas_left,
    seal_get_storage,
    seal_input,
    seal_return,
    seal_set_storage,
} from "./seal0";

export interface IKey {
    to_bytes(): ArrayBuffer;
}

export class Key implements IKey {
    constructor(readonly key: u64[]) {}
    to_bytes(): ArrayBuffer {
        return this.key.buffer;
    }

    static fromArrayU64(key: u64[]): Key {
        return new Key(key);
    }
}

export class Result<O, E> {
    private constructor(private readonly _ok: O | null, private readonly _err: E | null) {}

    static Ok<O, E>(ok: O): Result<O, E> {
        return new Result<O, E>(ok, null);
    }

    static Err<O, E>(err: E): Result<O, E> {
        return new Result<O, E>(null, err);
    }

    get ok(): bool {
        return this._err == null;
    }

    get err(): bool {
        return this._ok == null;
    }

    unwrap(): O {
        return this._ok as O;
    }

    unwrapErr(): E {
        return this._err as E;
    }
}

export class Option<T> {
    private constructor(private readonly val: T | null) {}

    static Some<T>(val: T): Option<T> {
        return new Option<T>(val);
    }

    static None<T>(): Option<T> {
        return new Option<T>(null);
    }

    get some(): bool {
        return this.val != null;
    }

    get none(): bool {
        return this.val == null;
    }

    unwrap(): T {
        return this.val as T;
    }
}


export interface EnvBackend {
    setContractStorage<K extends IKey, V extends Codec>(key: K, value: V): void;

    getContractStorage<K extends IKey, V extends Codec>(key: K): Result<V, ReturnCode>;

    clearContractStroage(key: Key): void;

    decodeInput<V extends Codec>(): Result<V, ReturnCode>;

    returnValue<V extends Codec>(flags: u32, value: V): void;

    // TODO: add more methods
}

export class EnvInstance implements EnvBackend {
    private buffer: ArrayBuffer = new ArrayBuffer(16 * 1024);

    setContractStorage<K extends IKey, V extends Codec>(
        key: K,
        value: V
    ): void {
        const valBytes = value.toU8a();
        return seal_set_storage(
            key.to_bytes(),
            valBytes.buffer,
            valBytes.length
        );
    }
    getContractStorage<K extends IKey, V extends Codec>(
        key: K
    ): Result<V, ReturnCode> {
        const value = instantiate<V>();
        const len = value.encodedLength();
        // TODO: recycle buf for env
        const buf = new ReadBuffer(len);
        const code = seal_get_storage(
            key.to_bytes(),
            buf.valueBuffer,
            buf.sizeBuffer
        );

        if (code != ReturnCode.Success) {
            return Result.Err(code);
        }

        // if read storage from native successfully, then populate it.
        // otherwise let it along with default constructed value.
        if (buf.readSize <= len) {
            value.populateFromBytes(buf.valueBytes, 0);
        }

        return Result.Ok(value);
    }

    clearContractStroage<K extends IKey>(key: Key): void {
        return seal_clear_storage(key.to_bytes());
    }

    decodeInput<V extends Codec>(): Result<V, ReturnCode> {
        ReadBuffer.readInstance<V>(seal_input);
    }

    private get_property<V extends Codec>(
        fn: (output: ArrayBuffer) => void
    ): Result<V, ReturnCode> {}

    returnValue<V extends Codec>(flags: number, value: V): void {
        let valBytes = value.toU8a();
        seal_return(flags, valBytes.buffer, valBytes.length);
    }
}
