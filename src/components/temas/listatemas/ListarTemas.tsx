import { useNavigate } from "react-router-dom"
import CardTemas from "../cardtemas/CardTemas"
import Tema from "../../../models/Tema"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../../contexts/AuthContext"
import { consultar } from "../../../services/Service"
import { DNA } from "react-loader-spinner"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function ListarTemas() {

   
     const navigate = useNavigate()

     //Inicializando o estado temas 
     const [temas, setTemas] = useState<Tema[]>([]) //Array para guardar vários objetos do modelo Tema (banco dados)

     //chama o logout para deslogar caso o token expire, e o usuario para guardar esse token
    const {handleLogout, usuario} = useContext(AuthContext)

    //guarda o token do ususario
    const token = usuario.token

    async function buscarTemas(){
      try{
        await consultar('/temas', setTemas, { // precisa preencher o estado temas com todos os dados da API
            headers: {Authorization : token} // passa como header a autorização que é o token
        })
      }catch(error: any){
        if(error.toString().includes('401')){ //se no erro convertido pra string tiver o 401 (nao autorizado)
          handleLogout() //vai sair
        }
      }
    }
    
    //Monitorar o temas - de acordo com o tamanho do array - se add ou removeu
    useEffect(() =>{
      buscarTemas()
    }, [temas.length]) //mudou o tamanho, executa o buscatemas e atualiza com os dados que estão la
    
    //Checar o token, ver se eleainda é válido, se não for, redireciona para o login
    useEffect(() =>{
      if(token === ''){ //user desconectado
          ToastAlerta('Você precisa estar logado!', 'info')
          navigate('/')
      }
    }, [token])
    
    return (
    <>

      {temas.length === 0 && (<DNA
        visible={true}height="200"width="200"ariaLabel="dna-loading"wrapperStyle={{}}wrapperClass="dna-wrapper mx-auto"/>)}

      <div className="flex justify-center w-full my-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {temas.map((tema) => ( // a cada elemento do array temas ,ele será exibido
              <CardTemas key={tema.id} tema= {tema} /> // key - identificador em cada componente card, passa um objeto tema como parametro
            ))}
          </div>
      </div>
    </>
  )
}

export default ListarTemas