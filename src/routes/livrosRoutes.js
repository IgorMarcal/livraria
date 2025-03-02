import express from "express";
import LivroController from "../controllers/livroController.js";

const livroRoutes = express.Router();

livroRoutes.get("/livros", LivroController.listarLivros);
livroRoutes.get("/livros/:id", LivroController.buscaLivro);
livroRoutes.post("/livros", LivroController.cadastraLivro); 
livroRoutes.put("/livros/:id", LivroController.atualizaLivro);


export default livroRoutes;