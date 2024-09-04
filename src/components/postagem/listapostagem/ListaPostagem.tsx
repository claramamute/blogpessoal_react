import { useContext, useEffect, useState } from "react";
import CardPostagem from "../cardpostagem/CardPostagem";
import Postagem from "../../../models/Postagem";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import { consultar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaPostagem() {
 
  const [postagens, setPostagens] = useState<Postagem[]>([]) // Inicializa com array de postagem vazio

  const navigate = useNavigate()

  const {handleLogout, usuario} = useContext(AuthContext)

  const token = usuario.token

  async function buscarPostagens() {

    try{
      await consultar('/postagens', setPostagens ,{
        headers:{
          Authorization: token
        }
      })


    } catch (error: any){
      if (error.toString().includes('401')) {
        ToastAlerta('Você precisa estar logado', 'info')
        handleLogout()
      }
    }
    
  }

  useEffect(() =>{
    buscarPostagens()
  }, [postagens.length])
  
  useEffect(()=>{
    if(token === ''){
      if (token === '') {
        ToastAlerta('Você precisa estar logado', 'info')
        navigate('/');
      }
    }
  }, [token])
  return (
    <>
  
      <div className='container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {postagens.map((postagem) => (
          <CardPostagem key={postagem.id} post= {postagem} />
        ))}
           
      </div>
    </>
  );
}
export default ListaPostagem