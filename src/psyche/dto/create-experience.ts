import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const createExperienceSchema = z.object({});
export class CreateExperienceDto extends createZodDto(createExperienceSchema) {}
