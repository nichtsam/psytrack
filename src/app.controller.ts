import { Controller, Get } from '@nestjs/common';
import { Public } from './common/decorators/public.decorator';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import * as packageJson from '../package.json';

@Public()
@Controller()
export class AppController {
  @ApiExcludeEndpoint()
  @Get()
  appInfo() {
    return {
      name: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
    };
  }
}
