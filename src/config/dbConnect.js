import mongoose from "mongoose";
import 'dotenv/config';

async function conectaDatabase() {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Conexão com MongoDB estabelecida");
    });

    mongoose.connection.on("error", (erro) => {
      console.error("Erro na conexão com MongoDB:", erro);
    });

    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    return mongoose.connection;
  } catch (erro) {
    console.error("Erro ao conectar com MongoDB:", erro);
  }
}

export default conectaDatabase;