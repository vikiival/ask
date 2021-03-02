import { UInt128, UInt64 } from "../../deps";
export { Hash } from '../../deps';

// Default types for env.
// Preprocess should import these types for default config.

export type AccountType = Array<u8>;
export type BalanceType = UInt128;
export type BlockNumber = UInt64;
export type Timestamp = UInt64;
