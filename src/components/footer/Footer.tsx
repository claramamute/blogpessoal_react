import { FacebookLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react"

function Footer() {

  let date = new Date().getFullYear()

  return (
    <div className="flex gap-2 justify-center text-center  bg-indigo-900 text-white ">
      <div className="container flex flex-col items-center py-4">
        <p className="text-xl font-bold">Blog pessoal Clara Araujo | Copyright: {date}</p>
        <p className="text-lg">Acesse nossas redes sociais</p>
        <div className="flex gap-2  justify-center">
              <LinkedinLogo size={48} weight='bold' />
              <InstagramLogo size={48} weight='bold' />
              <FacebookLogo size={48} weight='bold' />
        </div>
      </div>
    </div>
  )
}

export default Footer