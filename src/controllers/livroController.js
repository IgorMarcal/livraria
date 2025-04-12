import { autor, livro } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import ProcessaFiltros from "../Services/ProcessaFiltros.js";

class LivroController {

  static async listarLivros(req, res, next) {
    try {
      const listaLivros = livro.find();

      req.resultado = listaLivros;
      if(listaLivros.length === 0){
        next(new NaoEncontrado("Nenhum livro encontrado."));
      }
      next();

    } catch (erro) {
      next(erro);
    }
  }

  static async buscaLivro(req, res, next) {
    try {
      const livroId = req.params.id;
      const livroEncontrado = await livro.findById(livroId);

      if(livroEncontrado === null){
        next(new NaoEncontrado("ID do livro nao encontrado."))
      }
      res.status(200).json(livroEncontrado);
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastraLivro(req, res, next) {
    const novoLivro = req.body

    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      if (!autorEncontrado) {
        next("Autor não encontrado");
      }
      const livroCompleto = { ...novoLivro, autor: autorEncontrado._id };
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message: "Livro cadastrado com sucesso", livro: livroCriado });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizaLivro(req, res, next) {
    const dadosAtualizacao = req.body;
    try {

      const autorLivro = dadosAtualizacao.autor ? await autor.findById(dadosAtualizacao.autor) : null;
      if (dadosAtualizacao.autor && !autorLivro) {
        return next("Autor não encontrado");
      }
      const livroId = req.params.id;
      await livro.findByIdAndUpdate(livroId, { ...dadosAtualizacao, autor: autorLivro });
      res.status(200).json({ message: "Livro atualizado com sucesso" });
    } catch (erro) {
      next(erro);
    }
  }

  static async buscaLivroPorFiltro(req, res, next) {
    try {
      const busca = await new ProcessaFiltros(req.query).processaFiltro();
     
      if(busca !== null) {
        const livrosFiltrados = livro.find(busca);

        req.resultado = livrosFiltrados;
        next();
      }else{
        res.status(200).json([]);
      }

    } catch (erro) {
      next(erro);
    }
  }

  static async deletaLivro(req, res, next) {
    try {
      const livroId = req.params.id;
      if (!livroId) {
        return next("ID do livro não encontrado");
      }
      await livro.findByIdAndDelete(livroId);
      res.status(200).json({ message: `Livro deletado com sucesso!` });

    } catch (erro) {
      next(erro);
    }
  }
}


export default LivroController;