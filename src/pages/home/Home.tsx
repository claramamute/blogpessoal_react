//rfce -> gera o componente automaticamente
function Home() {
  return (
    <div style={{ //primeira chave -> trabalhar com código typescript, segunda -> trabalhar com objeto do tipo chave-valor
        width: '100vw', //ocupa todo espaço da viewport
        display: 'flex',
        justifyContent: 'center'
    }}>
      <div>
        <div style={{
            width: '80vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h2>Seja Bem-Vindo!</h2>
            <p>Expresse aqui seus pensamentos e opiniões</p>
        </div>
        <div style={{
            width: '80vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <img src="https://i.imgur.com/VpwApCU.png" alt="Imagem página home" width='400px '/>
        </div>
      </div>
    </div>
  )
}

export default Home