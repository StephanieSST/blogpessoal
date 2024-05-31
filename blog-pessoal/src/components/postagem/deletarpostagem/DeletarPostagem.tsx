import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import Postagem from '../../../models/Postagem'
import { buscar, deletar } from '../../../services/Service'
import { ToastAlerta } from '../../../utils/ToastAlerta'
import { RotatingLines } from 'react-loader-spinner'

function DeletarPostagem() {
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>()

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          'Authorization': token
        }
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Necessário realizar o login!', 'info')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function retornar() {
    navigate("/postagens")
  }

  async function deletarPostagem() {
    setIsLoading(true)

    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          'Authorization': token
        }
      })

      ToastAlerta('Postagem apagada com sucesso!', 'sucesso')

    } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout()
        } else {
          ToastAlerta('Erro ao apagar a Postagem!', 'erro')
        }
      
    }

    setIsLoading(false)
    retornar()
  }
  return (
    <div className='container w-1/3 mx-auto py-24'>
      <h1 className='text-4xl text-center my-6'>Deletar postagem</h1>

      <p className='text-center font-semibold mb-8'>Você tem certeza de que deseja apagar a postagem a seguir?</p>

      <div className='border-slate-200 border flex flex-col rounded-s-lg overflow-hidden justify-between'>
        <header className='py-2 px-6 bg-indigo-400 text-slate-900 font-semibold text-2xl'>Postagem</header>
        <div className="p-4">
          <p className='text-lg font-semibold uppercase text-slate-700'>{postagem.titulo}</p>
          <p>{postagem.texto}</p>
        </div>
        <div className="flex">
          <button className='text-slate-100 bg-red-400 hover:bg-red-500 w-full py-2' onClick={retornar}>Não</button>
          <button className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-500 flex items-center justify-center' onClick={deletarPostagem}>
           {isLoading ?
               <RotatingLines
                   strokeColor="white"
                   strokeWidth="5"
                   animationDuration="0.75"
                   width="24"
                   visible={true}
               /> :
               <span>Sim</span>
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarPostagem