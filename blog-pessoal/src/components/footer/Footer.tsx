import React from 'react'
import { FacebookLogo, GithubLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'

function Footer() {
 
  

  return (
    <>
        <div className="flex justify-center bg-indigo-900 text-white">
          <div className="container flex flex-col items-center py-4">
            <p className='text-xl font-bold'>Blog pessoal de Stephanie | Copyright: </p>
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

export default Footer