import { Module } from '@nestjs/common';
import { ImagekitService } from './imagekit.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [ImagekitService],
  exports: [ImagekitService],
})
export class ImagekitModule {}