import { autor } from "../models/index.js";

class ProcessaFiltros {
    constructor(params) {
        this.params = params;
    }
    
    async processaFiltro() {
        const { editora, titulo, minPag, maxPag, nomeAutor } = this.params;
        
        let filtros = {};
        if (editora) filtros.editora = {$regex: editora, $options: "i"};
        if (titulo) filtros.titulo = {$regex: titulo, $options: "i"};
        if (minPag || maxPag) filtros.paginas = {};
        if (minPag) filtros.paginas.$gte = minPag;
        if (maxPag) filtros.paginas.$lte = maxPag
        
        if (nomeAutor) {
            const autorEncontrado = await autor.findOne({ nome: { $regex: nomeAutor, $options: "i" } });
            if (autorEncontrado !== null) {
                filtros.autor = autorEncontrado._id;
            }else{
                filtros = null;
            }
        }

        return filtros;
    }
}



export default ProcessaFiltros;