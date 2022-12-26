import { IMusic } from 'src/interfaces/music.interface';

export type MusicDTO = IMusic;
export type MusicOutputDTO = Omit<IMusic, 'path'>;
