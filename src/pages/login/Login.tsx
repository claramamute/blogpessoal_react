import { Link, useNavigate } from "react-router-dom"
import './Login.css';
import UsuarioLogin from "../../models/UsuarioLogin";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";

function Login() {

  //Definir estados para trabalhar

  const navigate = useNavigate()

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin //inicializado como um objeto vazio de usuario login
  )

  
  //acessar conteudo da context
  const { usuario, handleLogin, isLoading } = useContext(AuthContext) // hook que consome o conteudo da context
  
  useEffect(()=> {
    if(usuario.token !== ''){ // se o token ter valor, significa que ele esta autenticado
      navigate('/home')
    } 
  }, [usuario])

  function atualizarEstado (e: ChangeEvent<HTMLInputElement>){ //monitora qualquer envento change em qualquer input do formulario

    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name] : e.target.value 

    })
  }

  function login(e: ChangeEvent<HTMLFormElement>){
    e.preventDefault()
    handleLogin(usuarioLogin)
  }


  return (
    <div className="grid grid-cols-2  h-screen place-items-center font-bold">
        <form onSubmit={login} className="flex justify-center items-center flex-col w-1/2 gap-4">
            <h2 className="text-slate-900 text-5xl">Entrar</h2>
            <div className="flex flex-col w-full">
                <label htmlFor="usuario">Usuario</label>
                <input type="text" id="usuario" name="usuario" placeholder="Usuario"  className="border-2 border-slate-700 rounded p-2 mb-4" value={usuarioLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />


                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha" name="senha" placeholder="Senha" className="border-2 border-slate-700 rounded p-2 mb-4" value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>

            </div>
            <div className=" flex gap-6 w-full justify-center">
                <button  type='submit' className="w-1/2 border-2 py-2 bg-indigo-400 text-white  hover:bg-indigo-900 rounded">
                {isLoading ? <RotatingLines strokeColor="white"strokeWidth="5"animationDuration="0.75"width="24"visible={true}/> :
                            <span>Entrar</span>}
                </button>
            </div>
            <hr className="border-slate-800 w-full" />
            <p>Ainda não tem uma conta? {' '}
              <Link to='/cadastro' className="text-indigo-800 hover:underline">Cadastre-se</Link>
            </p>
        </form>
        <div className="fundoLogin "></div>
    </div>
  )
}

export default Login