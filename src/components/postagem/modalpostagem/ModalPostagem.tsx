import Popup from "reactjs-popup"
import 'reactjs-popup/dist/index.css';

import './ModalPostagem.css'
import FormularioPostagem from "../formpostagem/FormularioPostagem";

function ModalPostagem() {
  return (
    <>
    <Popup
    trigger={<button className='border rounded px-4 hover:bg-white hover:text-indigo-800' >Nova Postagem</button>} modal>
        <div>
            <FormularioPostagem/>
        </div>
    </Popup>
    </>
  )
}

export default ModalPostagem