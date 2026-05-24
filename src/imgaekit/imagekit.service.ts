import { Injectable } from '@nestjs/common';
import ImageKit from 'imagekit';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImagekitService {
  private imagekit: ImageKit;

  constructor(private config: ConfigService) {
    this.imagekit = new ImageKit({
      publicKey: this.config.get<string>('IMAGEKIT_PUBLIC_KEY') || '',
      privateKey: this.config.get<string>('IMAGEKIT_PRIVATE_KEY') || '',
      urlEndpoint: this.config.get<string>('IMAGEKIT_URL_ENDPOINT') || '',
    });
  }

  /**
   * Upload générique (image, audio, vidéo, etc.)
   */
  async uploadFile(file: Express.Multer.File, folder: string): Promise<any> {
    return this.imagekit.upload({
      file: file.buffer.toString('base64'),
      fileName: `${Date.now()}-${file.originalname}`,
      folder,
      useUniqueFileName: true,
    });
  }

  /**
   * Upload image (thumbnail)
   */
  async uploadThumbnail(file: Express.Multer.File) {
    return this.uploadFile(file, '/contes/thumbnails');
  }

  /**
   * Upload audio
   */
  async uploadAudio(file: Express.Multer.File) {
    return this.uploadFile(file, '/contes/audio');
  }
}
