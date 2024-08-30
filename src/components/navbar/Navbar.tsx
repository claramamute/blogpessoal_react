import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext";


function Navbar() {

  const navigate = useNavigate();
 
  const { handleLogout } = useContext(AuthContext)
 
  function logout(){
    handleLogout();
    alert("O usuário foi desconectado com sucesso!");
    navigate("/")
  }
 
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
            <li className="hover:underline"><Link to='/temas'>Temas </Link></li>
            <li className="hover:underline"><Link to='/cadastrartema'>Cadastrar Tema </Link></li>
            <li className="hover:underline">Perfil</li>
            <li className="hover:underline"><Link to='' onClick={logout} className="hover:underline">
                        Sair
                      </Link>
            </li>
          </ul>
        </div>
      </div>
      

    </div>
    </>
  )
}

export default Navbar