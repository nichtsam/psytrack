import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { beforeEach, describe, expect, it } from 'vitest';
import { PostgresService } from '#src/db.module';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PostgresService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
