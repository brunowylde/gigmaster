import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="font-bold">Olá, Bruno! Vamos ensaiar hoje?</div>
      <div>
        <div 
          className="cursor-pointer rounded-md items-center max-md:h-[90px] bg-gray-400/15 px-8 py-3 w-full mt-4 flex gap-x-6"
          onClick={() => navigate('/novo-ensaio')}>
          {/* <div className="w-[80px] flex justify-center items-center">
            IMG
          </div> */}
          <div  className="w-full">
            <div className="font-bold">Ensaiar</div>
            <div className="text-[14px]">Aqui você adicionar um ensaio</div>
          </div>
        </div>
        <div 
          className="cursor-pointer rounded-md items-center max-md:h-[90px] bg-gray-400/15 px-8 py-3 w-full mt-4 flex gap-x-6">
          {/* <div className="w-[80px] flex justify-center items-center">
            IMG
          </div> */}
          <div className="w-full">
            <div className="font-bold">Últimos Ensaios</div>
            <div className="text-[14px]">Aqui você pode visualizar seus ensaios anteriores</div>
          </div>
        </div>
        <div 
          className="cursor-pointer rounded-md items-center max-md:h-[90px] bg-gray-400/15 px-8 py-3 w-full mt-4 flex gap-x-6"
          onClick={() => navigate('/minhas-musicas')}>
          {/* <div className="w-[80px] flex justify-center items-center">
            IMG
          </div> */}
          <div className="w-full">
            <div className="font-bold">Minhas Músicas</div>
            <div className="text-[14px]">Aqui você pode visualizar as músicas que você toca</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
