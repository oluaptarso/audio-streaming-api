import { Test, TestingModule } from '@nestjs/testing';
import { MusicController } from './music.controller';
import { MusicAppService } from './music.service';

describe('MusicController', () => {
  let controller: MusicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicController],
      providers: [MusicAppService],
    }).compile();

    controller = module.get<MusicController>(MusicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the music list with eight musics', async () => {
    const data = await controller.getMusics();
    expect(data).toBeDefined();
    expect(data.length).toBeDefined();
    expect(data.length).toBe(8);
  });
});
