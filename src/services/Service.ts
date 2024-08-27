import axios from "axios";

const api = axios.create( //criando nova instancia da lib axios e, conseguimos ter acesso aos métodos dele para aconsumir a API
    {
        baseURL: "https://blogpessoal-aef8.onrender.com",
    }
)

//persistir os dados do usuario no banco de dados 
//url -> endereco que vai mandar requisicao, dados: o objeto em si, setdados: funcao para atualizar o estado dos dados
export const cadastrarUsuario = async (url: string, dados: object, setDados: Function) =>{

    const resposta = await api.post(url, dados) // post -> já que vai criar/ enviar dados ao servidor pelo corpo
    setDados(resposta.data) //dados da resposta irao atualizar os dados do objeto
}

export const login = async (url: string, dados: object, setDados: Function) =>{
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}