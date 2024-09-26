import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpotifyService } from './spotify.service';
import { Musica } from './musica.entity';

@Injectable()
export class MusicaService {

  constructor(
    private readonly spotifyService: SpotifyService,
    @InjectRepository(Musica)
    private musicaRepository: Repository<Musica>,
  ) {}

  async buscarMusica(query: string) {
    return this.spotifyService.searchTrack(query);
  }

  async buscarMusicaFeatures(query: string) {
    return this.spotifyService.searchTrackFeatures(query);
  }

  async create(
    name: string, 
    artist: string, 
    album: string, 
    popularity: number,
    danceability: number,
    energy: number,
    tempo: number,
    image: string,
  ): Promise<Musica> {
    const novaMusica = this.musicaRepository.create({
      name,
      artist,
      album,
      popularity,
      danceability,
      energy,
      tempo,
      image,
    });

    return this.musicaRepository.save(novaMusica);
  }

  async findAll(): Promise<Musica[]> {
    return this.musicaRepository.find(); // Retorna todas as músicas do banco
  }

  async newPlaylist(): Promise<Musica[]> {
    let musicas = this.findAll();
    return musicas;
  }

  async getMusicaById(id: number): Promise<Musica | undefined> {
    return this.musicaRepository.findOneBy({ id_song: id }); // Busca a música pelo ID
  }

  async deleteMusica(id: number): Promise<void> {
    await this.musicaRepository.delete(id); // Remove a música pelo ID
  }
}
