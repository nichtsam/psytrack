import { AppError } from '#src/app.error';

type PsycheErrorCode = 'EXPERIENCE_NOT_FOUND';

export class PsycheError extends AppError<PsycheErrorCode> {}
