import { AppError } from '#src/app.error';

type UserErrorCode = 'EMAIL_ALREADY_USED';

export class UserError extends AppError<UserErrorCode> {}
