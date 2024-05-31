import FormPostagem from '../formpostagem/FormPostagem';
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';

import './ModalPostagem.css'

function ModalPostagem() {
  return (
    <>
      <Popup 
      trigger={<button className='border rounded px-2 hover:bg-white hover:text-indigo-800'>Nova postagem</button>} modal>
        
          <FormPostagem />
        
      </Popup>
    </>
  );
}

export default ModalPostagem;