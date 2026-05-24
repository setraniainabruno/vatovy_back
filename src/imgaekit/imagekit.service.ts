import { Injectable } from '@nestjs/common';
import ImageKit from 'imagekit';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImagekitService {
  private imagekit: ImageKit;

  constructor(private config: ConfigService) {
    this.imagekit = new ImageKit({
      publicKey: this.config.get<string>('IMAGEKIT_PUBLIC_KEY') || "",
      privateKey: this.config.get<string>('IMAGEKIT_PRIVATE_KEY') || "",
      urlEndpoint: this.config.get<string>('IMAGEKIT_URL_ENDPOINT') || "",
    });
  }

  async upload(file: Express.Multer.File): Promise<any> {
    return this.imagekit.upload({
      file: file.buffer.toString('base64'), // 🔥 important
      fileName: `${Date.now()}-${file.originalname}`,
      folder: '/uploads',
    });
  }
}