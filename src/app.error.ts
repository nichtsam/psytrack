export abstract class AppError<
  ErrorCode extends string | number,
> extends Error {
  public readonly code: ErrorCode;

  constructor(code: ErrorCode, message: string, cause?: unknown) {
    super(message, {
      cause,
    });

    this.name = new.target.name;
    this.code = code;
  }
}
