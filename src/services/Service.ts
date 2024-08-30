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


//função para fazer  o get - consultar dados no backend
// qunado receber os dados do backend - vai guardar todos os temas/postagem( array) nesse estado 
// passou o header pois esses métodos são protegidos
export const consultar = async(url: string, setDados: Function, header: Object) =>{
    const resposta = await api.get(url, header)
    setDados(resposta.data) //corpo da resposta da requisição
}


export const cadastrar = async(url: string, dados: Object, setDados: Function, header: Object) =>{
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data) 
}


//Função que envia requisições do tipo Put com token 
export const atualizar = async(url: string, dados: Object, setDados: Function, header: Object) =>{
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
}

export const deletar = async(url: string , header: Object) =>{
    await api.delete(url,  header)
   
}