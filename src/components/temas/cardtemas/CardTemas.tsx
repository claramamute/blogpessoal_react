import { Link } from "react-router-dom"
import Tema from "../../../models/Tema"

interface CardTemasProps{ //criando props (propriedades) - para passar como parâmetros
  tema: Tema; //objeto da interface Tema
}

function CardTemas({tema}: CardTemasProps) {
  return (
    <>
        <div className="overflow-hidden justify-between border rounded-2xl flex flex-col w-96">
            <h2 className="bg-indigo-800 text-white font-bold text-2xl py-2 px-6 ">Tema</h2>
            <p className="bg-slate-300 text-3xl  p-8 h-full ">{tema.descricao}</p>
           
            <div className="flex ">
                <Link to={`/editartema/${tema.id}`} className="bg-indigo-400 w-full text-slate-100 flex hover:bg-indigo-800 justify-center py-2 items-center">
                     <button>Editar</button>
                </Link>
                <Link to={`/deletartema/${tema.id}`} className="bg-red-400  w-full text-slate-100 flex justify-center hover:bg-red-700 py-2 items-center">
                     <button >Deletar</button>
                </Link>
            </div>
            
        </div>
    </>
  )
}

export default CardTemas