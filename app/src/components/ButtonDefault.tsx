interface ButtonProps {
  texto: string,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  optionalClass?: string
}

function ButtonDefault({ texto, onClick, optionalClass }: ButtonProps) {
  return (
    <>
      <button 
        onClick={ onClick }
        className={`bg-purple-500 text-white text-sm rounded-md h-full py-2 px-4 ${optionalClass}`}>
        { texto }
      </button>
    </>
  )
}

export default ButtonDefault