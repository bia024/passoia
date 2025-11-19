import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rotas de usuário
app.use("/users", userRoutes);

// Rota raiz
app.get("/", (req, res) => {
  res.json({ message: "API funcionando!" });
});

export default app;
