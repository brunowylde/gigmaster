import { useState, useEffect } from 'react';
import { API_URL } from '../../config'
import { Song } from '../../interfaces/song';
import ButtonDefault from '../../components/ButtonDefault'

function MinhasMusicas() {
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [songs, setSongs] = useState<Song[]>([]);

  async function searchSong() {
    try {
      setLoading(true)
      const response = await fetch(API_URL + '/musica/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: search }),
      });
      if (!response.ok) throw new Error('Erro ao buscar música');
      const data = await response.json();
      setSearch('');
      setSongs((old_items) => [...old_items, data])
    } catch (error) {
      console.error('Erro ao buscar música:', error);
    }

    setLoading(false)
  }

  async function getSongs() {
    try {
      const response = await fetch(API_URL + '/musica', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Erro ao buscar música');
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error('Erro ao buscar músicas');
    }
  }

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <div>
      <div className='font-bold'>Minhas Faixas</div>
      <div className='mt-4'>
        <div>
          <div className='text-[14px] font-semibold'>
            Adicionar Faixa
          </div>
          <div className='flex gap-x-4 mt-1 items-center'>
            <input
              type="text"
              className='w-full bg-gray-400/15 rounded-md py-2 text-sm px-4'
              placeholder='Digite aqui a música'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id='duracao'
            />
            <ButtonDefault 
              onClick={ searchSong } 
              loading={ loading }
              texto='Adicionar' 
              textoLoading='Adicionando...' />
          </div>
        </div>
        <hr className='my-4 border-gray-400/15' />
        <div>
          <div className='text-[14px] font-semibold'>
            Faixas
          </div>
          { songs && songs.map((song) => (
            <div className='mt-4 flex gap-x-4 bg-gray-400/15 p-4 rounded-md'>
              <div>
                <img src={ song.image } 
                  alt={ song.name } 
                  className=' rounded-lg w-24 min-w-24' />
              </div>
              <div>
                <h2 className='text-lg font-bold'>{ song.name }</h2>
                <p className='text-sm'>{ song.artist } - { song.album }</p>
                <div className='text-sm'>Tempo: { song.tempo } bpm</div>
                <p className='text-sm sm:flex gap-x-4'>
                  <div>Popularity: { song.popularity }</div>
                  <div>Energy: { song.energy }</div>
                  <div>Danceability: { song.danceability }</div>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MinhasMusicas;
