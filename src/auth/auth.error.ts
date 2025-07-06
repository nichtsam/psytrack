import { AppError } from 'src/app.error';

type AuthErrorCode = 'UNAUTHORIZED';

export class AuthError extends AppError<AuthErrorCode> {}
