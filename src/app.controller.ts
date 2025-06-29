import { Controller, Get } from '@nestjs/common';
import * as packageJson from '../package.json';

@Controller()
export class AppController {
  @Get()
  appInfo() {
    return {
      name: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
    };
  }
}
