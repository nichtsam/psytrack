import { Controller, Get } from '@nestjs/common';
import * as packageJson from '../package.json';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

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
