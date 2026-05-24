import { Module } from '@nestjs/common';
import { ReactionsService } from './reaction.service';
import { ReactionsController } from './reaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reaction } from './entities/reaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reaction])],
  controllers: [ReactionsController],
  providers: [ReactionsService],
})
export class ReactionModule {}
