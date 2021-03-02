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