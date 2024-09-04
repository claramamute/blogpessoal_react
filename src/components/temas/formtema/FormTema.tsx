import { useNavigate, useParams } from "react-router-dom"
import AuthContext from "../../../contexts/AuthContext"
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import Tema from "../../../models/Tema"
import { atualizar, cadastrar, consultar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function FormTema() {

  const [tema, setTema] = useState<Tema>(
    {} as Tema
  )
  const navigate = useNavigate()

  //Hook para pegar um parâmetro (variavel) dentro da rota  - aproveita o mesmo formulario para criar e atualizar
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { handleLogout, usuario } = useContext(AuthContext)

  const token = usuario.token


  async function buscarPorId(id: string) {
    try {
      await consultar(`/temas/${id}`, setTema, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (id !== undefined) { //user desconectado
      buscarPorId(id)
    }
  }, [id])

  //Se o token expirar, vai redirecionar

  useEffect(() => {
    if (token === '') { //user desconectado
      ToastAlerta('Você precisa estar logado!', 'info')
      navigate('/')
    }
  }, [token])

  function retornar() {
    navigate('/temas')
  }

  //Fazer cadastro de temas
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema, // para manter os outros campos enquanto um está sendo alterado pleo input
      [e.target.name]: e.target.value

    })
  }

  async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setIsLoading(true)

    //Checar se é atualização ou cadastro de tema

    if (id !== undefined) {

      try {
        await atualizar(`/temas`, tema, setTema, {
          headers: { Authorization: token }
        })

        ToastAlerta('Tema atualizado com sucesso!', 'sucesso');
        retornar()

      } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout()
        } else{
          ToastAlerta('Erro ao atualizar o Tema!', 'erro')
        }

      }


    } else {
      try {
        await cadastrar(`/temas`, tema, setTema, {
          headers: { Authorization: token }
        })

        ToastAlerta('Tema cadastrado com sucesso!', 'sucesso');

      } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout()
        } else{
          ToastAlerta('Erro ao cadastrar o Tema!', 'erro')
        }

      }

      setIsLoading(false)
      
    }
  }



  return (
    <>
      <div className="flex flex-col justify-center container mx-auto items-center">
        <h1 className="text-4xl text-center my-8">
          {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
        </h1>

        <form
          onSubmit={gerarNovoTema}
          className="w-1/2 flex flex-col gap-4">

          <div className="flex flex-col gap-2" >
            <label htmlFor="descricao">Descrição do Tema:</label>
            <input type="text" id="descricao" name="descricao" placeholder="Descrição" className="border-2 border-slate-700 rounded p-2"
              value={tema.descricao}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <button className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto flex  justify-center"
            type="submit">
            {isLoading ?
              <RotatingLines
                strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> :

              <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>}
          </button>
        </form>

      </div>
    </>
  )
}

export default FormTema