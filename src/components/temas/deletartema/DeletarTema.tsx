import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import AuthContext from "../../../contexts/AuthContext"
import Tema from "../../../models/Tema"
import { consultar, deletar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"

function DeletarTema() {
    const navigate = useNavigate()

    const [tema, setTema] = useState<Tema>({} as Tema)
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const { handleLogout, usuario } = useContext(AuthContext)

    const token = usuario.token

    const { id } = useParams<{ id: string }>();

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
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])


    function retornar() {
        navigate('/temas')
    }


    async function deletarTema() {
        setIsLoading(true)
        try {
            await deletar(`/temas/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            alert('Tema apagado com sucesso')

        } catch (error) {
            alert('Erro ao apagar o Tema')
        }
        setIsLoading(false)
        retornar()
    }


    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar tema</h1>

            <p className='text-center font-semibold mb-4'>Você tem certeza de que deseja apagar o tema a seguir?</p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>Tema</header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{tema.descricao}</p>
                <div className="flex">
                    <button onClick={retornar}
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2' >Não</button>
                    <button onClick={deletarTema} className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center' >
                        {isLoading ?
                            <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> :
                            <span>Sim</span>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarTema