import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './Cadastro.css';
import Usuario from '../../models/Usuario';
import {  useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../../services/Service';
import { RotatingLines } from 'react-loader-spinner';

function Cadastro() {

   // guarda a navegação por meio das rotas - hook para redirecionar rotas
  const navigate = useNavigate();

  //criação de estados para renderizar conteudo na page
  // guardará dados do usuario quando enviar no forms
  const [usuario, setUsuario] = useState<Usuario>({
    id:0,
    nome: "",
    usuario: "",
    foto: "",
    senha: "",
  }) 

  // estado que checa se o user colocou a senha certa
  const [confirmaSenha, setConfirmaSenha] = useState<string> ("");

  // usado para controlar quando a animação no botao vai aparecer e desaparecer
  const [isLoading, setIsLoading] = useState<boolean> (false)

  //useEffect para monitorar o estado user
  useEffect(() => {
    if(usuario.id !==0 ){ //significa que foi cadastrado no banco
      retornar()
    }
  }, [usuario])

  //redireciona para componente login
  function retornar(){
    navigate('/login')
  }

  //função para receber os dados do formulario e guardar dentro do estado usuario
  function atualizarEstado (e: ChangeEvent<HTMLInputElement>){ //monitora qualquer envento change em qualquer input do formulario

    setUsuario({
      ...usuario, //manter tudo que já estava no estado usuario, para não substituir valores das propriedades (nome, senha)
      [e.target.name] : e.target.value //o que quer que altere (pega o name do input que voce digitou alguma coisa e atualiza com o valor digitado nele)

    })
  }
    // console.log(usuario) - estado 

  function handleConfirmarSenha (e: ChangeEvent<HTMLInputElement>){
    setConfirmaSenha(e.target.value)
  }

  //Enviar objetos para a requisição 

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) { // evento de disparo do submit do form
    e.preventDefault() //impetir que envie form atutomaticamente

    if(confirmaSenha === usuario.senha && usuario.senha.length >= 8){
      //mudar estado isLoad -> aparecer a animação enquanto envia a requisição e está aguardando resposta do backedn
      setIsLoading(true)

      try{
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario) // Função da service,  url requisicao, objeto do forms, mudança de estado

        alert('Usuario cadastrado com sucesso')

      } catch (error){
        alert('Erro ao cadastrar!')
      }
    } else{
      alert('Dados inconsistentes! Verifique novamente as informações')
      setUsuario({...usuario, senha: ""})
      setConfirmaSenha("")
    }

    setIsLoading(false) //parar de rodar a animação do botao
  }

  return (
    <div className="grid grid-cols-2 place-items-center h-screen font-bold"> {/*place-items-center -> itens no meio , h-screen -> 100vh*/}
        <div className="fundoCadastro"></div>
        <form  onSubmit={cadastrarNovoUsuario}
        className="flex flex-col gap-3 justify-center items-center  w-2/3 ">
          <h2 className="text-slate-900 text-5xl">Cadastrar</h2>
          <div className="flex flex-col w-full ">  {/*width 100%, ocupou todo 2/3 de tela*/}

            <label htmlFor="nome" >Nome</label>
            <input 
              type="text" 
              id="nome" 
              name="nome" 
              placeholder="Nome" 
              className="border-2 p-2 border-slate-700 rounded mb-4" 
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />

            <label htmlFor="usuario" >Usuario</label>
            <input 
              type="text" 
              id="usuario" 
              name="usuario" 
              placeholder="Usuario" 
              className="border-2 p-2 border-slate-700 rounded mb-4"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />

            <label htmlFor="foto" >Foto</label>
            <input 
              type="text" 
              id="foto" 
              name="foto" 
              placeholder="Foto" 
              className="border-2 p-2 border-slate-700 rounded mb-4 " 
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />

            <label htmlFor="senha">Senha</label>
            <input 
              type="password" 
              id="senha" 
              name="senha" 
              placeholder="Senha" 
              className="border-2 p-2 border-slate-700 rounded  mb-4" 
              value={usuario.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />

            <label htmlFor="confirm"> Confirmar Senha</label>
            <input type="password" id="confirm" name="confirm" placeholder="Confirmar Senha" className="border-2 p-2 border-slate-700 rounded mb-4 "
              value = {confirmaSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e) }
             />
          </div>
          <div className=" flex gap-6 w-full">
            <button  type='submit' className="w-1/2 border-2 py-2 bg-red-400 text-white  hover:bg-red-700 " 
            onClick={retornar}>Cancelar</button>
            
            <button  type='submit' className="w-1/2 border-2 py-2 bg-indigo-400 text-white  flex justify-center hover:bg-indigo-900">
            {isLoading ? <RotatingLines strokeColor="white"strokeWidth="5"animationDuration="0.75"width="24"visible={true}/> :
                    <span>Cadastrar</span>}
            </button>
          </div>

        </form>
       
      </div>
  
  )
}

export default Cadastro 