import mongoose from "mongoose";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import ErroBase from "../erros/ErroBase.js";

//eslint-disable-next-line no-unused-vars
function manipuladorDeErros (erro, req, res, next)  {
    if( erro instanceof mongoose.Error.CastError) {
      new RequisicaoIncorreta(erro).enviarResposta(res);
    }else if(erro instanceof mongoose.Error.ValidationError){
      new ErroValidacao(erro).enviarResposta(res);
    }else if(erro instanceof NaoEncontrado){
      erro.enviarResposta(res);
    }else{
      console.log(erro);
      let errorData = res;
      if(erro.message !== "") errorData = erro.message; 
      new ErroBase(errorData).enviarResposta(res);
    }
}

export default manipuladorDeErros;