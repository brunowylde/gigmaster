import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Musica } from './musica.entity';
import { MusicaController } from './musica.controller';
import { MusicaService } from './musica.service';
import { SpotifyService } from './spotify.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Musica])],
  controllers: [MusicaController],
  providers: [MusicaService, SpotifyService],
})
export class MusicaModule {}
