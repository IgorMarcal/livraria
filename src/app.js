import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import livroRoutes from './routes/livrosRoutes.js';

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conexao com o banco feita com sucesso");
})

const app = express();
app.use(express.json());
app.use(livroRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Curso de Node.js");
});



// app.put("/livros/:id", (req, res) => {
//   const index = buscaLivro(req.params.id);
//   livros[index].titulo = req.body.titulo;
//   res.status(200).json(livros);
// });

// app.delete("/livros/:id", (req, res) => {
//   const index = buscaLivro(req.params.id);
//   livros.splice(index, 1);
//   res.status(200).send("livro removido com sucesso");
// });

export default app;