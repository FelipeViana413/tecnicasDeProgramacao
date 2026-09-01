const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const port = 3000;

// Configuração da conexão com o MongoDB
const mongoUrl = "mongodb://root:password@localhost:27017/conversoes_db?authSource=admin"; // URL do MongoDB no container Docker
const dbName = "conversoes_db"; // Nome do banco de dados
let db;

// Conectar ao banco de dados
MongoClient.connect(mongoUrl)
  .then((client) => {
    console.log("Conectado ao MongoDB.");
    db = client.db(dbName); // Seleciona o banco de dados
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
    process.exit(1); // Encerra a aplicação em caso de erro de conexão
  });

// Endpoint para converter decimal para binário e salvar no banco de dados
app.get("/to-binary/:decimal", async (req, res) => {
  const decimal = parseInt(req.params.decimal, 10);
  if (isNaN(decimal)) {
    return res.status(400).json({ error: "Número decimal inválido" });
  }

  const binary = decimal.toString(2);

  try {
    // Insere a conversão no banco de dados
    const result = await db.collection("conversoes").insertOne({
      numero_decimal: decimal,
      numero_binario: binary,
    });
    res.json({ decimal, binary, insertedId: result.insertedId });
  } catch (err) {
    console.error("Erro ao salvar no banco de dados:", err);
    res.status(500).json({ error: "Erro ao salvar no banco de dados" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});