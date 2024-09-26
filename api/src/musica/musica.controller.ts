import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MusicaService } from './musica.service';
import { Musica } from './musica.entity';

@Controller('musica')
export class MusicaController {
  constructor(private readonly musicaService: MusicaService) {}

  // rota para buscar uma música do serviço do spotify e inserir no banco
  @Post('search') // /musica/search
  async buscarMusica(@Body() body: { query: string }) {
    const basic_data = await this.musicaService.buscarMusica(body.query);

    let musica_features = null
    if (basic_data) {
      musica_features = await this.musicaService.buscarMusicaFeatures(basic_data.id);
    }

    if (basic_data && musica_features) {
      const song = await this.musicaService.create(
        basic_data.name, 
        basic_data.artists[0].name, 
        basic_data.album.name, 
        basic_data.popularity, 
        musica_features.danceability * 100,
        musica_features.energy * 100,
        musica_features.tempo,
        basic_data.album.images[0].url,
      )

      return song;
    } else {
      return 'Ocorreu um erro'
    }
  }

  // Rota para listar todas as músicas
  @Get() // /musica
  findAll(): Promise<Musica[]> {
    return this.musicaService.findAll();
  }

  @Post() // /musica
  newPlaylist(): Promise<Musica[]> {
    return this.musicaService.newPlaylist();
  }

  // Rota para pegar uma música por ID
  @Get(':id') // /musica/:id
  getMusicaById(@Param('id') id: number) {
    return this.musicaService.getMusicaById(id);
  }

  // Rota para deletar uma música por ID
  @Delete(':id') // /musica/:id
  deleteMusica(@Param('id') id: number): void {
    this.musicaService.deleteMusica(id);
  }
}
