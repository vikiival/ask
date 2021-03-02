import { Codec } from "../../deps";
import { ReturnCode } from "../../primitives/alias";

import { Result, Wrap } from "../../utils";

export interface IKey {
    to_bytes(): ArrayBuffer;
}

export type WrapReturnCode = Wrap<ReturnCode>;

export interface Env {
    env(): TypedEnvBackend;
}

export interface EnvBackend {
    setContractStorage<K extends IKey, V extends Codec>(key: K, value: V): void;

    getContractStorage<K extends IKey, V extends Codec>(
        key: K
    ): Result<V, WrapReturnCode>;

    clearContractStroage(key: Key): void;

    decodeInput<V extends Codec>(): Result<V, WrapReturnCode>;

    returnValue<V extends Codec>(flags: u32, value: V): void;

    // TODO: add more methods
}

// TODO: find a way to define a generic interface
export interface TypedEnvBackend extends EnvBackend {
    caller<T extends Codec>(): Result<T, WrapReturnCode>;

    transferredBalance<T extends Codec>(): Result<T, WrapReturnCode>;

    gasLeft<T extends Codec>(): Result<T, WrapReturnCode>;

    blockTimestamp<T extends Codec>(): Result<T, WrapReturnCode>;

    accountId<T extends Codec>(): Result<T, WrapReturnCode>;

    balance<T extends Codec>(): Result<T, WrapReturnCode>;

    rentAllowance<T extends Codec>(): Result<T, WrapReturnCode>;

    blockNumber<T extends Codec>(): Result<T, WrapReturnCode>;

    minimumBalance<T extends Codec>(): Result<T, WrapReturnCode>;

    tombstoneDeposit<T extends Codec>(): Result<T, WrapReturnCode>;

    // emitEvent<T extends Codec, Event>(): void;

    // setRentAllowance<T extends Codec>(newValue: T): void;

    // invokeContract()

    // evalContracr()

    // restoreContract<A extends Codec, H extends Codec, B extends Codec> (accountId: A, codeHash: H, rentAllowance: B, filteredKeys: Array<IKey>): void;

    // terminateContract<T extends Codec>(beneficiary: T): void;

    // transfer<A extends Codec, B extends Codec>(dest: A, value: B): void;

    // TODO: add more methods
}

