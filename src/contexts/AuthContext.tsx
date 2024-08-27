//Definir quais informações serão guardadas na context

import { createContext, ReactNode, useState } from "react"
import UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service"

interface AuthContextProps{ //propriedades da context 
    usuario: UsuarioLogin //estado usuario
    handleLogin(usuario: UsuarioLogin): Promise<void> //responsavel por fazer o login
    handleLogout(): void // deslogar
    isLoading: boolean // estado
}

interface AuthProviderProps{
    children: ReactNode // representa qualquer componente react que pode ser renderizada - usado para criar o provedor de conteudos
}

 //Cria nova instancia da API Context
export const AuthContext = createContext({} as AuthContextProps)

//cria o provedor que recebe os filhos e implementa a interface / estado global da aplicação - para todos componentes acessarem
export function AuthProvider({children}: AuthProviderProps) { 

  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id:0,
	nome: "",
	usuario: "",
	foto: "",
	senha: "",
    token: "",
  }) //inicializando o objeto user e seus estados

  const [isLoading, setIsLoading] = useState(false)

   async function handleLogin(usuarioLogin: UsuarioLogin){
    
    setIsLoading(true);

    try{

        await login('/usuarios/logar', usuarioLogin, setUsuario) // caminho da requisicao,  dados do forms, qual estado vai mudar (usuario)
        alert('Usuario autenticado com sucesso!')

    } catch(error){
        alert('Os dados estão incosistentes')
    }

    setIsLoading(false)

}

function handleLogout(){
    setUsuario({
        id:0,
        nome: "",
        usuario: "",
        foto: "",
        senha: "",
        token: "",
    })
}

  return (
    //Renderiza a Context na aplicação React
    <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}> {/* dentro do value, deixa todos os valores que serao usados nos filhos */}
        {children} 
    </AuthContext.Provider>
  )
}

export default AuthContext