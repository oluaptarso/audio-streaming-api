export interface MusicDTO {
  trackNumber: string;
  name: string;
  path: string;
}

export type MusicOutputDTO = Omit<MusicDTO, 'path'>;
