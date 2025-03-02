import livro from "../models/Livro.js";

class LivroController {

    static async listarLivros(req, res) {
        try {
          const listaLivros = await livro.find({}).populate("autor").exec();
          res.status(200).json(listaLivros);
        } catch (erro) {
          res
            .status(500)
            .json({ message: `${erro.message} - falha na requisição` });
        }
    }

    static async buscaLivro(req, res) {
        try {
            const livroId = req.params.id;
            const livroEncontrado = await livro.findById(livroId);
            res.status(200).json(livroEncontrado);
        }catch (erro) {
            res
            .status(500)
            .json({ message: `${erro.message} - falha na requisição` });
        }
    }

    static async cadastraLivro(req, res) {
        try {
            const livroCadastrado = await livro.create(req.body);
            res.status(201).json({message: "Livro cadastrado com sucesso", livro: livroCadastrado});
        }catch (erro) {
            res
            .status(500)
            .json({ message: `${erro.message} - falha na requisição` });
        }
    }

    static async atualizaLivro(req, res) {
        try {
            const livroId = req.params.id;
            await livro.findByIdAndUpdate(livroId, req.body);
            res.status(200).json({message: "Livro atualizado com sucesso"});
        }catch (erro) {
            res
            .status(500)
            .json({ message: `${erro.message} - falha na requisição` });
        }
    }
}


export default LivroController;