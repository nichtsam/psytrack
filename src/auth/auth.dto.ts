import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const SignupSchema = z.object({
  email: z.string().email().describe('User email'),
  password: z.string().min(6).describe('User password (min 6 chars)'),
});
const LoginSchema = SignupSchema.pick({ email: true, password: true });

export class SignupDto extends createZodDto(SignupSchema) {}
export class LoginDto extends createZodDto(LoginSchema) {}
