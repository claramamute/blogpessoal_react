
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Cadastro from './pages/cadastro/Cadastro'
import Login from './pages/login/Login'
import { AuthProvider } from './contexts/AuthContext'
import ListarTemas from './components/temas/listatemas/ListarTemas'
import FormTema from './components/temas/formtema/FormTema'
import DeletarTema from './components/temas/deletartema/DeletarTema'
import ListaPostagem from './components/postagem/listapostagem/ListaPostagem'
import FormularioPostagem from './components/postagem/formpostagem/FormularioPostagem'
import DeletarPostagem from './components/postagem/deletapostagem/DeletarPostagem'
import Perfil from './pages/perfil/Perfil'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  //Código TypeScript

  return (
   // Código TSX => HTML e CSS
   //Colocar um fragment (englose tag fantasma) div fantasma - se tiver mais de um elemento num componente
   <> 
   <AuthProvider> {/* disponibiliza os 2 estados (usuario e isloading) e a login e logout para todos esses componentes */}
    <ToastContainer />
    <BrowserRouter>
        <Navbar />
        <div className= 'min-h-[80vh]'>
          
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path= '/login' element={<Login/>} />
            <Route path='/cadastro' element={<Cadastro/>} />
            <Route path='/home' element={<Home/>} /> {/* adiciona o componente (que é independente) home no principal */}
            <Route path="/temas" element={<ListarTemas />} />
            <Route path="/cadastrartema" element={<FormTema />} />
            <Route path="/editartema/:id" element={<FormTema />} />
            <Route path="/deletartema/:id" element={<DeletarTema />} />
            <Route path='/postagens' element={<ListaPostagem/>}/>
            <Route path="/cadastrarpostagem" element={<FormularioPostagem />} />
            <Route path="/editarpostagem/:id" element={<FormularioPostagem />} />
            <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
   </>

  )
}

export default App
