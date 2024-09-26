import { useState, useEffect, useCallback, useMemo } from 'react';
import { Song } from '../../interfaces/song';
import MusicaEnsaio from '../../components/MusicaEnsaio';

interface SongsSelected {
  start: { name: string; musicas: Song[] };
  firstSlowDown: { name: string; musicas: Song[] };
  middle: { name: string; musicas: Song[] };
  secondSlowDown: { name: string; musicas: Song[] };
  ending: { name: string; musicas: Song[] };
}

function NovoEnsaio() {
  const [duracao, setDuracao] = useState<number>(2.5);
  const [songs, setSongs] = useState<Song[]>([]);
  
  const initSongsSelected: SongsSelected = {
    start: { name: 'Beginning', musicas: [] },
    firstSlowDown: { name: '1st Slowdown', musicas: [] },
    middle: { name: 'Middle of the Show', musicas: [] },
    secondSlowDown: { name: 'Pre-Ending', musicas: [] },
    ending: { name: 'Ending', musicas: [] },
  };

  const [songsSelected, setSongsSelected] = useState<SongsSelected>(initSongsSelected);

  const shuffleArray = useCallback((array: Song[]): Song[] => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }, []);

  const getSongs = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/musica');
      if (!response.ok) throw new Error('Erro ao buscar música');
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error('Erro ao buscar músicas', error);
    }
  }, []);

  function newAutoSetlist() {
    setSongsSelected(initSongsSelected);

    const shuffledSongs = shuffleArray(songs);
    const numSongs = Math.floor((duracao * 60) / 5);

    const limits = {
      start: Math.floor(numSongs * 0.18),
      firstSlowDown: Math.floor(numSongs * 0.12),
      middle: Math.floor(numSongs * 0.40),
      secondSlowDown: Math.floor(numSongs * 0.12),
      ending: Math.floor(numSongs * 0.18),
    };

    const counts = { start: 0, firstSlowDown: 0, middle: 0, secondSlowDown: 0, ending: 0 };
    const tempSongs: SongsSelected = { ...initSongsSelected };

    for (const song of shuffledSongs) {
      const { popularity, energy, tempo, danceability } = song;

      if (counts.start < limits.start && popularity > 78 && energy > 70 && tempo > 100) {
        tempSongs.start.musicas.push(song);
        counts.start++;
      } else if (counts.firstSlowDown < limits.firstSlowDown && energy < 70) {
        tempSongs.firstSlowDown.musicas.push(song);
        counts.firstSlowDown++;
      } else if (counts.middle < limits.middle && energy > 65) {
        tempSongs.middle.musicas.push(song);
        counts.middle++;
      } else if (counts.secondSlowDown < limits.secondSlowDown && energy < 65 && danceability < 40) {
        tempSongs.secondSlowDown.musicas.push(song);
        counts.secondSlowDown++;
      } else if (popularity > 70 && energy > 60 && tempo > 90 && counts.ending < limits.ending) {
        tempSongs.ending.musicas.push(song);
        counts.ending++;
      }
    }

    setSongsSelected(prevState => ({
      ...prevState,
      ...tempSongs,
    }));
  }

  useEffect(() => {
    getSongs();
  }, [getSongs]);

  const renderedSections = useMemo(() => {
    return Object.entries(songsSelected).map(([key, section]) => {
      if (section.musicas.length > 0) {
        return (
          <div key={key} className='mt-6'>
            <div className="font-bold mb-1 text-lg">{section.name}</div>
            {section.musicas.map((musica:Song, index:number) => (
              <MusicaEnsaio key={index} musica={musica} />
            ))}
          </div>
        );
      }
      return null;
    });
  }, [songsSelected]);

  return (
    <div>
      <div className='font-bold'>Novo Ensaio</div>
      <div className='mt-4'>
        <div>
          <div className='text-[14px] font-semibold'>Qual a duração, em horas?</div>
          <div className='flex gap-x-4'>
            <input
              type="range"
              className='w-full'
              min="0.5"
              max="10"
              step="0.5"
              value={duracao}
              onChange={(e) => setDuracao(parseFloat(e.target.value))}
              id='duracao'
            />
            <div className='text-nowrap font-bold text-sm'>{duracao} hora</div>
          </div>
        </div>
        <div className='mt-4'>
          <div className='text-sm font-semibold'>Selecionar faixas</div>
        </div>
        <div className='mt-8'>
          <button 
            className='w-full py-2.5 font-bold text-sm bg-purple-600 rounded-md'
            onClick={newAutoSetlist}>
            Gerar Setlist
          </button>
        </div>

        <div className='mt-10'>
          {renderedSections}
        </div>
      </div>
    </div>
  );
}

export default NovoEnsaio;
