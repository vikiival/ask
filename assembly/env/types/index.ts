import { UInt128, UInt64, UInt32 } from "../../deps";
export { Hash } from '../../deps';

// TODO: define interfaces for all of them.
// Default types for env.
// Preprocess should import these types for default config.
export type AccountId = Array<u8>;
export type Balance = UInt128;
export type Timestamp = UInt64;
export type BlockNumber = UInt32;