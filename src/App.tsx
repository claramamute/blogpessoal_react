
import './App.css'
import Home from './pages/home/home'

function App() {
  //Código TypeScript

  return (
   // Código TSX => HTML e CSS
   //Colocar um fragment (englose tag fantasma) div fantasma - se tiver mais de um elemento num componente
   <> 
    <Home /> {/* adiciona o componente (que é independente) home no principal */}

   </>

  )
}

export default App
