import { u128 } from "as-bignum";
import { AccountId } from "../buildins";
import { UInt128, UInt16 } from "../deps";
import { CallInputBuilder, env } from "./engine";
import { EnvInstance } from "./engine/onchain";
import { Balance } from './types/index';

const envInstance = env();

// let res = envInstance.call<AccountId, Balance, CallInputBuilder, UInt16>(
//     new AccountId([1, 2, 3, 4]),
//     1000,
//     new UInt128(),
//     new CallInputBuilder("test", []),
// );
// envInstance.transfer<AccountId, Balance>(new AccountId([1, 2, 3, 4]), new ());

class A {
}

type B = A;

const a: B = new A();
const b: B = new B();