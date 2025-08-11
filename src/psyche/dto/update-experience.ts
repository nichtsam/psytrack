import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const updateExperienceSchema = z.object({});
export class UpdateExperienceDto extends createZodDto(updateExperienceSchema) {}
