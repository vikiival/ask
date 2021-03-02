export class Result<O, E> {
    private constructor(
        private readonly _ok: O | null,
        private readonly _err: E | null
    ) {}

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
