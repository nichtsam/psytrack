import { Injectable, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as postgres from 'postgres';

@Injectable()
export class PostgresService {
  public sql;

  constructor(configService: ConfigService) {
    const url = configService.get<string>('DATABASE_URL');
    if (!url) {
      throw new Error('env DATABASE_URL missing');
    }
    this.sql = postgres(url);
  }
}

@Module({
  providers: [PostgresService],
  exports: [PostgresService],
})
export class PostgresModule {}
