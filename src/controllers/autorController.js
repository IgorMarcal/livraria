import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autor } from "../models/index.js";

class AutorController {

  static async listarAutores (req, res, next) {
    try {
      const listaAutores =  autor.find();
      req.resultado = listaAutores;
      if(listaAutores.length === 0){
        return next(new NaoEncontrado("Nenhum autor encontrado."));
      }
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static async listarAutorPorId (req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);
      
      if(autorEncontrado !== null){
        res.status(200).send(autorEncontrado);
      }else{
        res.status(400).send('Autor não encontrado');
      }

    } catch (erro) {
      next(erro);
    }
  };

  static async cadastrarAutor (req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "criado com sucesso", livro: novoAutor });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarAutor (req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findByIdAndUpdate(id, req.body);

      if(autorEncontrado === null){
        res.status(404).json({ message: "autor não encontrado" });
      }else{
        res.status(200).json({ message: "autor atualizado" });
      }
    } catch (erro) {
      next(erro);
    }
  };

  static async excluirAutor (req, res, next) {
    try {
      const id = req.params.id;
      const autor = await autor.findByIdAndDelete(id);
      
      if(autor === null){
        res.status(404).json({ message: "autor não encontrado" });
      }else{
        res.status(200).json({ message: "autor excluído com sucesso" });
      }

    } catch (erro) {
      next(erro);
    }
  };
};

export default AutorController;