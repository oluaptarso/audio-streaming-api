import { Controller, Get, NotFoundException, Param, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { MusicOutputDTO } from 'src/dto/music.dto';
import { MusicAppService } from './music.service';
import type { Response } from 'express';

@Controller('music')
export class MusicController {
  constructor(private readonly appService: MusicAppService) {}

  @Get()
  async getMusics(): Promise<MusicOutputDTO[]> {
    const musics = await this.appService.getMusics();

    // Omit the path property of MusicDTO
    return musics.map(({ name, trackNumber }) => ({
      name,
      trackNumber,
    }));
  }

  @Get(':id')
  findOne(@Res({ passthrough: true }) res: Response, @Param() params): StreamableFile {
    const id = params.id;

    // verify if it's within the music's quantity
    if (id > 0 && id <= 10) {
      const fileName = `${params.id}.mp3`;
      const file = createReadStream(join(process.cwd(), 'src/data/mp3/', fileName));
      res.set({
        'Content-Type': 'audio/mpeg3',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      });
      return new StreamableFile(file);
    }
    throw new NotFoundException();
  }
}
