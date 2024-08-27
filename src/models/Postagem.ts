import Tema from "./Tema";
import Usuario from "./Usuario";

export default interface Postagem{ //export default -> publico na aplicacao

    id: number;
	titulo:string;
	texto: string;
    data: string;
    tema: Tema | null;
    usuario: Usuario| null;
	
}