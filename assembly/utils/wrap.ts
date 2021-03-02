export class Wrap<T> {
    constructor(private readonly val: T) {}

    static from<T>(val: T): Wrap<T> {
        return new Wrap<T>(val);
    }

    unwrap(): T {
        return this.val;
    }
}
