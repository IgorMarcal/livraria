import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { type: String, required: [true, "Titulo da obra é necessário."] },
  editora: { type: String, required: [true, "Campo editora é obrigatorio."] },
  preco: { type: Number },
  paginas: {
    type: Number,
    validate: {
      validator: (valor) => {
        return valor >= 10 && valor <= 5000;
      },
      message: "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
    }
  },
  autor: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O autor do livro é obrigatorio."],
    autopopulate:true
  },
}, { versionKey: false });

livroSchema.plugin(autopopulate);
const livro = mongoose.model("livros", livroSchema, 'livros');

export default livro;