import { Test, TestingModule } from '@nestjs/testing';
import { PsycheService } from './psyche.service';
import { beforeEach, describe, expect, it } from 'vitest';
import { PostgresService } from '#src/db.module';

describe('PsycheService', () => {
  let service: PsycheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PsycheService,
        {
          provide: PostgresService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PsycheService>(PsycheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
