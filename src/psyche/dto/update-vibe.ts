import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const updateVibeSchema = z.object({});
export class UpdateVibeDto extends createZodDto(updateVibeSchema) {}
