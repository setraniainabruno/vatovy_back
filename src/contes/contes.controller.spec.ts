import { Test, TestingModule } from '@nestjs/testing';
import { ContesController } from './contes.controller';
import { ContesService } from './contes.service';

describe('ContesController', () => {
  let controller: ContesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContesController],
      providers: [ContesService],
    }).compile();

    controller = module.get<ContesController>(ContesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
