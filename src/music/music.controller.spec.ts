import { Test, TestingModule } from '@nestjs/testing';
import { MusicController } from './music.controller';
import { MusicOutputDTO } from 'src/dto/music.dto';
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

  it('should return music list', async () => {
    const data = await controller.getMusics();
    expect(data).toBeDefined();
    expect(data.length).toBeDefined();
    expect(data.length).toBe(10);
  });
});
