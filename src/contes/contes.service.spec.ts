import { Test, TestingModule } from '@nestjs/testing';
import { ContesService } from './contes.service';

describe('ContesService', () => {
  let service: ContesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContesService],
    }).compile();

    service = module.get<ContesService>(ContesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
