import { Injectable } from '@nestjs/common';
import { MusicDTO } from 'src/dto/music.dto';
import { readFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class MusicAppService {
  async getMusics(): Promise<MusicDTO[]> {
    const rawData = await readFile(join(process.cwd(), 'src/data/data.json'), 'utf-8');

    return JSON.parse(rawData) as MusicDTO[];
  }
}
