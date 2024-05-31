import { FacebookLogo, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'

function Footer() {
 
  const { usuario } = useContext(AuthContext)

  let footerComponent

  let data = new Date().getFullYear()

  if(usuario.token !== '') {
    footerComponent = (

    <>
        <div className="flex justify-center bg-indigo-900 text-white">
          <div className="container flex flex-col items-center py-4">
            <p className='text-xl font-bold'>Blog pessoal de Stephanie | Copyright: {data}</p>
            <p className='text-lg'>Conecte-se Comigo</p>
            <div className='flex gap-2'>
              <a href="https://github.com/StephanieSST" target="_blank">
              <GithubLogo size={48} weight='bold' />
              </a>
              <a href="https://www.linkedin.com/in/stephanie-steuernagel-tavares/" target="_blank">
              <LinkedinLogo size={48} weight='bold' />
              </a>
              <a href="https://www.facebook.com/stephanie.steuernagel" target="_blank">
              <FacebookLogo size={48} weight='bold' />
              </a>
            </div>
          </div>
        </div>
      </>
  )
}
return (
  <>
  {footerComponent}
  </>
)
}

export default Footer

