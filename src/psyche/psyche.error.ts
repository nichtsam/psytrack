import { AppError } from '#src/app.error';

type PsycheErrorCode = 'EVENT_NOT_FOUND';

export class PsycheError extends AppError<PsycheErrorCode> {}
