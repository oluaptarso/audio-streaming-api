import { Controller, Get, Header, Headers, HttpException, HttpStatus, Param, Res } from '@nestjs/common';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import { MusicOutputDTO } from 'src/dto/music.dto';
import { MusicAppService } from './music.service';
import { Response } from 'express';

@Controller('music')
export class MusicController {
  constructor(private readonly appService: MusicAppService) {}

  @Get()
  async getMusics(): Promise<MusicOutputDTO[]> {
    const musics = await this.appService.getMusics();

    // Omit the path property of MusicDTO
    return musics.map(({ name, trackNumber, author }) => ({
      author,
      name,
      trackNumber,
    }));
  }

  @Get(':id')
  @Header('Accept-Ranges', 'bytes')
  @Header('Content-Type', 'audio/mpeg3')
  findOne(@Param('id') id: number, @Headers() headers, @Res() res: Response) {
    const range = headers.range;
    // verify if it's within the music's quantity and it is a partial request
    if (id > 0 && id <= 8 && range) {
      const fileName = `${id}.mp3`;
      const filePath = join(process.cwd(), 'src/data/mp3/', fileName);
      const { size } = statSync(filePath);

      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = Math.min(start + Math.floor(size * 0.2), size - 1);
      const chunksize = end - start + 1;
      const readStreamfile = createReadStream(filePath, { start, end, highWaterMark: 60 });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Content-Length': chunksize,
      };
      res.writeHead(HttpStatus.PARTIAL_CONTENT, head); //206
      readStreamfile.pipe(res);
    } else {
      throw new HttpException('Invalid Request', HttpStatus.BAD_REQUEST);
    }
  }
}
