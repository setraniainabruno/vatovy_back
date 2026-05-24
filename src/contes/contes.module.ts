import { Module } from '@nestjs/common';
import { ContesService } from './contes.service';
import { ContesController } from './contes.controller';
import { ImagekitModule } from 'src/imgaekit/imagekit.module';

@Module({
  imports:[ImagekitModule],
  controllers: [ContesController],
  providers: [ContesService],
})
export class ContesModule {}
