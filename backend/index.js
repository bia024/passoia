import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota base
app.get("/", (req, res) => {
  res.send("API está rodando! 🚀");
});

// Criar usuário
app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  const user = await prisma.user.create({
    data: { name, email }
  });

  res.json(user);
});

// Listar todos
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Buscar por ID
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: Number(id) }
  });

  res.json(user);
});

// Atualizar
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: { name, email }
  });

  res.json(user);
});

// Deletar
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  await prisma.user.delete({
    where: { id: Number(id) }
  });

  res.json({ message: "Usuário deletado com sucesso!" });
});

// Servidor
app.listen(3000, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000");
});
