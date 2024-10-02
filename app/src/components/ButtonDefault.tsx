interface ButtonProps {
  texto: string,
  textoLoading?: string,
  loading?: boolean,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  optionalClass?: string
}

const classes = "bg-purple-500 disabled:bg-gray-400 text-white text-sm rounded-md h-full py-2 px-4"

function ButtonDefault({ texto, textoLoading, loading, onClick, optionalClass }: ButtonProps) {
  return (
    <>
      <button 
        disabled={ loading }
        onClick={ onClick }
        className={` ${classes} ${optionalClass}`}>
        { loading ? textoLoading : texto }
      </button>
    </>
  )
}

export default ButtonDefault
