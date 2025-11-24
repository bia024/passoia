import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import userRoutes from "./src/routes/user.routes.js";
import produtoRoutes from "./src/routes/produto.routes.js";
import wishlistRoutes from "./src/routes/wishlist.routes.js";
import { errorHandler } from "./src/middlewares/error.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({ windowMs: 60_000, max: 100 });
app.use(limiter);

app.use("/users", userRoutes);
app.use("/produtos", produtoRoutes);
app.use("/wishlist", wishlistRoutes);

app.get("/health", (req, res) => res.json({ ok: true }));

app.post("/admin/login", (req, res) => {
  const { senha } = req.body;

  if (!senha) return res.status(400).json({ error: "Senha é obrigatória." });

  if (senha === process.env.ADMIN_PASSWORD) {
    return res.status(200).json({ message: "Login bem-sucedido." });
  } else {
    return res.status(401).json({ error: "Senha incorreta." });
  }
});

app.use(errorHandler);

export default app;
