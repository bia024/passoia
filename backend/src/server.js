// import express from "express";
// import cors from "cors";
// import { prisma } from "./prisma/client.js";

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({ message: "API funcionando!" });
// });

// rota Prisma (teste)
// app.get("/users", async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

// app.listen(3000, () => {
//   console.log("Servidor rodando em http://localhost:3000");
// });

import app from "./app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});
