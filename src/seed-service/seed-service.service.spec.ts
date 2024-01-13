import { Test, TestingModule } from '@nestjs/testing';
import { SeedServiceService } from './seed-service.service';

describe('SeedServiceService', () => {
  let service: SeedServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeedServiceService],
    }).compile();

    service = module.get<SeedServiceService>(SeedServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
