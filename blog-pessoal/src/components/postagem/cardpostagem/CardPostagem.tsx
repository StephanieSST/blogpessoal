import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem'

interface CardPostagemProps {
  postagem: Postagem
}

function CardPostagem({postagem}: CardPostagemProps) {
  return (
    <div className='border-slate-200 border flex flex-col rounded-s-lg overflow-hidden justify-between'>
      <div>
        <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
          <img src={postagem.usuario?.foto} className='h-12 rounded-full' alt="" />
          <h3 className='text-lg font-bold text-center uppercase text-slate-900'>{postagem.usuario?.nome}</h3>
        </div>
        <div className='p-4 '>
          <h4 className='text-lg font-semibold uppercase text-slate-700'>{postagem.titulo}</h4>
          <p>{postagem.texto}</p>
          <p>Tema: {postagem.tema?.descricao}</p>
          <p>Data: {new Intl.DateTimeFormat(undefined, {
                    dateStyle: 'full',
                    timeStyle: 'medium',
                  }).format(new Date(postagem.data))}</p>
        </div>
      </div>
      <div className="flex">
      <Link to={`/editarPostagem/${postagem.id}`} className='w-full text-white bg-indigo-400 hover:bg-indigo-500 flex items-center justify-center py-2'>
          <button>Atualizar</button>
        </Link>
        <Link to={`/deletarPostagem/${postagem.id}`} className='text-white bg-red-400 hover:bg-red-500 w-full flex items-center justify-center'>
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  )
}

export default CardPostagem