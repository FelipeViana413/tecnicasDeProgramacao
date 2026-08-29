const express = require("express");
const app = express();
const port = 3000;
// Endpoint para converter decimal para binário
app.get("/to-binary/:decimal", (req, res) => {
 // Converte o parâmetro para número inteiro
 const decimal = parseInt(req.params.decimal, 10);
 // Se não for número decimal retorna um erro com status 400
 if (isNaN(decimal)) {
   return res.status(400).json({ error: "Invalid decimal number" });
 }
 const binary = decimal.toString(2); // Converte o número decimal para binário
 res.json({ decimal, binary }); // Retorna a resposta como JSON
});
app.listen(port, () => {
 console.log(`Servidor rodando na porta ${port}`);
});
// Novo endpoint para converter decimal para hexadecimal
app.get("/to-hex/:decimal", (req, res) => {
   const decimal = parseInt(req.params.decimal, 10);
    if (isNaN(decimal)) {
     return res.status(400).json({ error: "Invalid decimal number" });
   }
    // Converte para hexadecimal e deixa em maiúsculas
   const hex = decimal.toString(16).toUpperCase();
   res.json({ decimal, hex });
 });
  app.listen(port, () => {
   console.log(`Server running on http://localhost:${port}`);
 });