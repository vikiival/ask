/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

import { UnwrappableCodec } from "../deps";
import { ReadBuffer } from "../primitives/readbuffer";
import { seal_gas_left } from "../seal/seal0";

export class Gas {
  static gasleft<T>(): T {
    return ReadBuffer.readInstance<UnwrappableCodec<T>>(seal_gas_left).unwrap();
  }
}