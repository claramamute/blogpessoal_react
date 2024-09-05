import { Link } from "react-router-dom"
import ListaPostagem from "../../components/postagem/listapostagem/ListaPostagem"
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem"

//rfce -> gera o componente automaticamente
function Home() {
  return (
    <>
    <div className="
    bg-indigo-900
    flex
    justify-center">
      <div className="
      container
      grid
      grid-cols-2
      text-white">
        <div className="
        flex
        flex-col
        gap-4
        items-center
        justify-center
        py-4
        ">
            <h2
            className="text-5xl
            font-bold
            ">
              Seja Bem-Vindo!
            </h2>

            <p className="text-xl">
              Expresse aqui seus pensamentos e opiniões
            </p>


            <div className="flex justify-around gap-4">
              <ModalPostagem />
              <button className='rounded bg-white text-blue-800 py-2 px-4'><Link to='/postagens'>Ver postagens</Link></button>
            </div>

        </div>
        <div  >
            <img src="https://i.imgur.com/VpwApCU.png" alt="Imagem página home" className="w-2/3 "/>
        </div>
        
      </div>
      
    </div>
    <ListaPostagem/>
    </>
  )
}

export default Home