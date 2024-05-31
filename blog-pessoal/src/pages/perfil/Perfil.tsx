import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import login from '../../assets/login.jpg'
import { ToastAlerta } from '../../utils/ToastAlerta'
function Perfil() {
  let navigate = useNavigate()

    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            ToastAlerta('Dados Inconsistentes', 'erro')
            navigate("/login")
        }
    }, [usuario.token])
    
  return (
    <div className='container mx-auto mt-4 rounded-2xl py-6 overflow-hidden w-11/12'>
      <img className='w-full rounded-xl h-72 object-cover border-b-8 border-white' src={login} alt="Capa do Perfil" />
      <img src={usuario.foto} alt={`Foto de perfil de ${usuario.nome}`} className='rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10' />
      <div className="relative rounded-xl mt-[-6rem] h-72 my-10 flex flex-col bg-sky-500 text-white text-2xl items-center justify-center">
        <p>Nome: {usuario.nome} </p>
        <p>Email: {usuario.usuario}</p>
      </div>
    </div>
  )
}

export default Perfil