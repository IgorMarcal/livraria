import express from "express";
import LivroController from "../controllers/livroController.js";
import paginar from "../middlewares/paginar.js";

const livroRoutes = express.Router();

livroRoutes
    .get("/livros/busca", LivroController.buscaLivroPorFiltro, paginar)
    .get("/livros", LivroController.listarLivros, paginar)
    .get("/livros/:id", LivroController.buscaLivro)
    .post("/livros", LivroController.cadastraLivro) 
    .put("/livros/:id", LivroController.atualizaLivro)
    .delete("/livros/:id", LivroController.deletaLivro);

export default livroRoutes;