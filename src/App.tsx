
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'


function App() {
  //Código TypeScript

  return (
   // Código TSX => HTML e CSS
   //Colocar um fragment (englose tag fantasma) div fantasma - se tiver mais de um elemento num componente
   <> 
   <BrowserRouter>
      <Navbar />
      <div className= 'min-h-[80vh]'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/home' element={<Home/>} /> {/* adiciona o componente (que é independente) home no principal */}
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
   </>

  )
}

export default App
