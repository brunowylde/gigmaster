import { Song } from '../interfaces/song';

interface MusicaEnsaioProps {
  musica: Song
}

function MusicaEnsaio ({ musica }: MusicaEnsaioProps) {
  return (
    <>
      <div className='bg-gray-400/15 mt-1 rounded py-2 px-4 flex'>
        <div>
          <img src={ musica.image } className='h-8 w-8 rounded-full' />
        </div>
        <div className='ml-4'>
          <div className='font-bold'>{ musica.name }</div>
          <div className="italic text-sm">{ musica.artist }</div>
        </div>
      </div>
    </>
  )
}

export default MusicaEnsaio