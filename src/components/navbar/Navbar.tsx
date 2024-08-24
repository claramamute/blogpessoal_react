import { Link } from "react-router-dom"


function Navbar() {
  return (
    <>
    <div className="w-full py-4 bg-indigo-900   flex justify-center  text-white " >
      <div className="container flex flex-row justify-between text-lg ">
        <div className="uppercase text-2xl  font-bold  ">
          <Link to='/home'>Blog Pessoal </Link>
        </div>
        <div>
          <ul className="flex flex-row gap-4">
            <li className="hover:underline">Postagens</li>
            <li className="hover:underline">Temas</li>
            <li className="hover:underline">Cadastrar Tema</li>
            <li className="hover:underline">Perfil</li>
            <li className="hover:underline">Sair</li>
          </ul>
        </div>
      </div>
      

    </div>
    </>
  )
}

export default Navbar