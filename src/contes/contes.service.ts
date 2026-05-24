import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Conte } from './entities/conte.entity';
import { CreateConteDto } from './dto/create-conte.dto';
import { UpdateConteDto } from './dto/update-conte.dto';
import { ImagekitService } from '../imgaekit/imagekit.service';

@Injectable()
export class ContesService {
  constructor(
    @InjectRepository(Conte)
    private readonly conteRepository: Repository<Conte>,
    private readonly imagekitService: ImagekitService,
  ) {}

  // =========================
  // UTILS
  // =========================

  private formatDuration(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }

  /**
   * CREATE CONTE (avec upload ImageKit)
   */
  async create(
    dto: CreateConteDto,
    thumbnailFile?: Express.Multer.File,
    audioFile?: Express.Multer.File,
  ): Promise<Conte> {
    let thumbnailUrl = dto.thumbnail;
    let audioUrl = dto.audioUrl;
    let durationSeconds = 0;

    // =====================
    // UPLOAD THUMBNAIL
    // =====================
    if (thumbnailFile) {
      const uploaded =
        await this.imagekitService.uploadThumbnail(thumbnailFile);
      thumbnailUrl = uploaded.url;
    }

    // =====================
    // UPLOAD AUDIO + GET DURATION
    // =====================
    if (audioFile) {
      const uploaded = await this.imagekitService.uploadAudio(audioFile);
      audioUrl = uploaded.url;

      const metadata = await import('music-metadata');
      const parsed = await metadata.parseBuffer(
        audioFile.buffer,
        audioFile.mimetype,
      );

      durationSeconds = Math.floor(parsed.format.duration || 0);
    }

    const conte = this.conteRepository.create({
      ...dto,
      thumbnail: thumbnailUrl,
      audioUrl,
      durationSeconds,
      duration: this.formatDuration(durationSeconds),
      playCount: 0,
      isActive: true,
    });

    return this.conteRepository.save(conte);
  }

  /**
   * FIND ALL
   */
  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{
    data: any[];
    total: number;
    page: number;
    totalPage: number;
  }> {
    const [data, total] = await this.conteRepository.findAndCount({
      relations: ['category'],
      order: {
        createdAt: 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const formatted = data.map((conte) => this.formatConte(conte));

    return {
      data: formatted,
      total,
      page,
      totalPage: Math.ceil(total / limit),
    };
  }

  /**
   * FIND ONE
   */
  async findOne(id: string): Promise<any> {
    const conte = await this.conteRepository.findOne({
      relations: ['category'],
      where: { id },
    });

    if (!conte) {
      throw new NotFoundException('Conte introuvable');
    }

    return this.formatConte(conte);
  }

  /**
   * UPDATE
   */
  async update(id: string, updateConteDto?: UpdateConteDto): Promise<Conte> {
    const conte = await this.findOne(id);

    const dto = updateConteDto ?? {};

    Object.assign(conte, {
      ...dto,
      title: dto.title ?? conte.title,
      description: dto.description ?? conte.description,
      categoryID: dto.categoryId ?? conte.categoryId,
    });

    return this.conteRepository.save(conte);
  }
  /**
   * DELETE
   */
  async remove(id: string): Promise<{ message: string }> {
    const conte = await this.findOne(id);

    await this.conteRepository.remove(conte);

    return { message: 'Conte supprimé avec succès' };
  }

  /**
   * INCREMENT PLAY COUNT
   */
  async incrementPlayCount(id: string): Promise<Conte> {
    const conte = await this.findOne(id);

    conte.playCount += 1;

    return this.conteRepository.save(conte);
  }

  private formatConte(conte: Conte) {
    return {
      id: conte.id,
      title: conte.title,
      description: conte.description,

      duration: conte.duration,
      durationSeconds: conte.durationSeconds,

      thumbnail: conte.thumbnail,
      audioUrl: conte.audioUrl,

      playCount: conte.playCount,
      isActive: conte.isActive,

      category: conte.category?.name ?? null,

      createdAt: this.toMadagascarTime(conte.createdAt),
      updatedAt: this.toMadagascarTime(conte.updatedAt),
    };
  }

  private toMadagascarTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Indian/Antananarivo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };
}
