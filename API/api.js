const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());

// Liberando controle de acesso cors do navegador para todos
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  app.use(cors());
  next();

});

let users = [];

// Definindo a leitura do arquivo onde esta sendo inseridos os dados
fs.readFile("users.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    users = JSON.parse(data);
  }
});

// Inserindo um usuário pelo metodo POST
app.post("/users", (request, response) => {
  const { nome, email, cpf, senha } = request.body;

  const user = {
    nome,
    email,
    cpf,
    senha,
    id: randomUUID(), 
  }
  users.push(user);
  userFile();
  return response.json("Usuario Cadastrado com Sucesso!");
});

// Listando todos os usuários pelo metodo GET
app.get("/users",(request, response) => { 

  return response.json(users);
});

// Listando o usuário apenas pelo Id pelo metodo GET
app.get("/users/:id", (request, response) => {
  const { id } = request.params;
  const user = users.find((user) => user.id === id);

  return response.json(user);
});

// Alterando um usuário pelo Id pelo metodo PUT
app.put("/users/:id", (request, response) => {
  const { id } = request.params;
  const { nome, email, cpf, senha } = request.body;

  const userIndex = users.findIndex((user) => user.id === id);
  users[userIndex] = {
    ...users[userIndex],
    nome,
    email,
    cpf,
    senha,
  };
  userFile();
  return response.json("Usuario alterado com sucesso");
})

// Excluindo um usuário pelo Id pelo metodo DELETE
app.delete("/users/:id", (request, response) => {
  const { id } = request.params;
  const userIndex = users.findIndex((user) => user.id === id);
  users.splice(userIndex, 1);
  userFile();

  return response.json({ message: "Usuario removido com sucesso!" });
});

/**  Definindo uma função para gravar os dados inseridos 
dentro de um arquivo JSON */
function userFile() {

  fs.writeFile("users.json", JSON.stringify(users), (err) => {
    if(err) {
      console.log(err);
    } else {
      console.log("Dados inseridos");
    }
  });

}

app.listen(4003, () => console.log("Servidor está rodando na porta 4003"));
