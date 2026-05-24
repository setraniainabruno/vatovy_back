import { Module } from '@nestjs/common';
import { ContesService } from './contes.service';
import { ContesController } from './contes.controller';
import { ImagekitModule } from 'src/imgaekit/imagekit.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conte } from './entities/conte.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conte]), ImagekitModule],
  controllers: [ContesController],
  providers: [ContesService],
})
export class ContesModule {}
