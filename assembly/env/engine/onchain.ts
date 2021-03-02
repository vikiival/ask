import { ReadBuffer } from "../../primitives/readbuffer";
import { AccountId } from "../../buildins/AccountId";
import {
    seal_address,
    seal_balance,
    seal_caller,
    seal_clear_storage,
    seal_gas_left,
    seal_get_storage,
    seal_input,
    seal_minimum_balance,
    seal_println,
    seal_rent_allowance,
    seal_return,
    seal_set_storage,
    seal_transfer,
    seal_value_transferred,
    seal_now,
} from "../../seal/seal0";
import { BalanceType } from "../BalanceType";
import { Codec } from "../../deps";
import { ReturnCode } from "../../primitives/alias";

import { Result } from "../../utils";
import { IKey, TypedEnvBackend, WrapReturnCode } from "./backend";


export function env(): EnvInstance {
    return EnvInstance.env;
}


/**
 * On-chain env for ask. Preprocess should use this for onchain mode.
 */
export class EnvInstance implements TypedEnvBackend {
    public static readonly env: EnvInstance = new EnvInstance();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}
    
    // EnvBackend

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
    ): Result<V, WrapReturnCode> {
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

    decodeInput<V extends Codec>(): Result<V, WrapReturnCode> {
        // TODO:
        return Result.Ok(ReadBuffer.readInstance<V>(seal_input));
    }

    returnValue<V extends Codec>(flags: number, value: V): void {
        let valBytes = value.toU8a();
        seal_return(flags, valBytes.buffer, valBytes.length);
    }

    println(content: string): void {
        seal_println(changetype<ArrayBuffer>(content), content.length);
    }

    // TypedEnvBackend
    caller<A extends Codec>(): Result<A, WrapReturnCode> {
        return Result.Ok<A, WrapReturnCode>(
            ReadBuffer.readInstance<A>(seal_caller)
        );
    }

    transferredBalance<B extends Codec = BalanceType>(): Result<
        B,
        WrapReturnCode
    > {
        return Result.Ok<B, WrapReturnCode>(
            ReadBuffer.readInstance<B>(seal_value_transferred)
        );
    }

    transfer<A extends Codec, B extends Codec>(dest: A, value: B): void {
        const destBytes = dest.toU8a();
        const valueBytes = value.toU8a();
        seal_transfer(destBytes.buffer, destBytes.length, valueBytes.buffer, valueBytes.length);
    }

    // TODO:
    gasLeft<T extends Codec>(): Result<T, WrapReturnCode> {
        return Result.Ok<T, WrapReturnCode>(
            ReadBuffer.readInstance<T>(seal_gas_left)
        );
    }

    blockTimestamp<T extends Codec>(): Result<T, WrapReturnCode> {
        return Result.Ok<T, WrapReturnCode>(
            ReadBuffer.readInstance<T>(seal_now)
        );
    }

    accountId<T extends Codec>(): Result<T, WrapReturnCode> {
        return Result.Ok<T, WrapReturnCode>(
            ReadBuffer.readInstance<T>(seal_address)
        );
    }

    balance<T extends Codec>(): Result<T, WrapReturnCode> {
        return Result.Ok<T, WrapReturnCode>(
            ReadBuffer.readInstance<T>(seal_balance)
        );
    }

    rentAllowance<T extends Codec>(): Result<T, WrapReturnCode> {
        return Result.Ok<T, WrapReturnCode>(
            ReadBuffer.readInstance<T>(seal_rent_allowance)
        );
    }

    minimumBalance<T extends Codec>(): Result<T, WrapReturnCode> {
        return Result.Ok<T, WrapReturnCode>(
            ReadBuffer.readInstance<T>(seal_minimum_balance)
        );
    }

    tombstoneDeposit<T extends Codec>(): Result<T, WrapReturnCode> {
        throw new Error("Method not implemented.");
    }

    blockNumber<T extends Codec>(): Result<T, WrapReturnCode> {
        return Result.Ok<T, WrapReturnCode>(
            ReadBuffer.readInstance<T>(seal_balance)
        );
    }
}
