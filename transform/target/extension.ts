import { FnParameters, Msg, Storage, ReturnData, ScaleString, UInt32, Bool} from "../../assembly";
import { u128 } from 'as-bignum';
/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */


class Planets {
  private _name: ScaleString | null = null;
  private _radius: UInt32 | null = null;
  private _isdwarf: Bool | null = null;

  get name(): string {
      if (this._name === null) {
          const st = new Storage<ScaleString>("Planetsname");
          this._name = st.load();
      }
      return this._name!.toString();
  }
  set name(v: string) {
      this._name = new ScaleString(v);
      const st = new Storage<ScaleString>("Planetsname");
      st.store(this._name!);
  }

  get radius(): u32 {
      if (this._radius === null) {
          const st = new Storage<UInt32>("Planetsradius");
          this._radius = st.load();
      }
      return this._radius!.unwrap();
  }
  set radius(v: u32) {
      this._radius = new UInt32(v);
      const st = new Storage<UInt32>("Planetsradius");
      st.store(this._radius!);
  }

  get isdwarf(): boolean {
      if (this._isdwarf === null) {
          const st = new Storage<Bool>("Planetsisdwarf");
          this._isdwarf = st.load();
      }
      return this._isdwarf!.unwrap();
  }
  set isdwarf(v: boolean) {
      this._isdwarf = new Bool(v);
      const st = new Storage<Bool>("Planetsisdwarf");
      st.store(this._isdwarf!);
  }
}

@contract
class SolarSystem {
  protected stored: Planets;

  constructor() {
      this.stored = new Planets();
  }

  @constructor
  default(name = "Earth", radius: u32 = 6300, isdwarf = false): void {
      this.stored.name = name;
      this.stored.radius = radius;
      this.stored.isdwarf = isdwarf;
  }

  @message
  set(name: string, radius: u32, isdwarf: boolean): void {
      if (this.stored.name != name) {
          this.stored.name = name;
          this.stored.radius = radius;

          this.stored.isdwarf = isdwarf;
      }
  }

  @message(mutates = false, selector = "0x0a0b0c0d")
  getRadius(): u32 {
      return this.stored.radius;
  }
}
var msg: Msg = new Msg();

export function deploy(): i32 {
    let solarSystem = new SolarSystem();

    const defaultSelector: u8[] = [0xed,0x4b,0x9d,0x1b];
    if (msg.isSelector(defaultSelector)) {
        const fnParameters = new FnParameters(msg.data);
        let p0 = fnParameters.get<ScaleString>();
        let p1 = fnParameters.get<UInt32>();
        let p2 = fnParameters.get<Bool>();
        solarSystem.default(p0.toString(),p1.unwrap(),p2.unwrap());
    }
    return 0;
}

export function call(): i32 {
    const solarSystem = new SolarSystem();
    const setSelector: u8[] = [0xe8,0xc4,0x5e,0xb6];
    if (msg.isSelector(setSelector)) {
        const fnParameters = new FnParameters(msg.data);
        let p0 = fnParameters.get<ScaleString>();
        let p1 = fnParameters.get<UInt32>();
        let p2 = fnParameters.get<Bool>();
        solarSystem.set(p0.toString(),p1.unwrap(),p2.unwrap());
    }
    const getRadiusSelector: u8[] = [0x42,0xe6,0x8a,0x21];
    if (msg.isSelector(getRadiusSelector)) {
        let rs = solarSystem.getRadius();
        ReturnData.set<UInt32>(new UInt32(rs));
    }
    return 0;
}