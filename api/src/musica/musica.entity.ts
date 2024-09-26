import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('songs')
export class Musica {
  @PrimaryGeneratedColumn()
  id_song: number;

  @Column()
  name: string;

  @Column()
  artist: string;

  @Column()
  album: string;

  @Column()
  popularity: number;

  @Column()
  energy: number;

  @Column()
  danceability: number;

  @Column()
  tempo: number;

  @Column()
  image: string;
}
