import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const createVibeSchema = z.object({});
export class CreateVibeDto extends createZodDto(createVibeSchema) {}
