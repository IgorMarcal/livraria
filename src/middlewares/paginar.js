import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
    try{
        let {limite = 5, pagina = 1, ordenacao = "_id:-1"} = req.query;
        let [campoOrdernacao, ordem] = ordenacao.split(":");
          
        limite = parseInt(limite);
        pagina = parseInt(pagina);
        ordem = parseInt(ordem);
  
        const resultado = req.resultado;
        if(limite < 1 || pagina < 1){
          return next(new RequisicaoIncorreta("Limite ou pagina inválidos."));
        } 
  
        const resultadoPaginado = await resultado.find()
          .sort({ [campoOrdernacao]: ordem })
          .skip((pagina-1) * limite)
          .limit(limite)
          .exec();  

        res.status(200).json(resultadoPaginado);
    }catch(erro){
        next(erro);
    }
}

export default paginar;