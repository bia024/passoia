import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import userRoutes from "./src/routes/user.routes.js";
import produtoRoutes from "./src/routes/produto.routes.js";
import wishlistRoutes from "./src/routes/wishlist.routes.js";
import { errorHandler } from "./src/middlewares/error.js";
import db from "./db.js";

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

app.post("/cupons", async (req, res) => {
  const { codigo, usuarioNome, usuarioEmail } = req.body;

  if (!codigo || !usuarioNome || !usuarioEmail) {
    return res.status(400).json({
      error: "Dados incompletos. Código, nome e e-mail são obrigatórios.",
    });
  }

  const insertQuery = `
    INSERT INTO cupons(codigo, usuario_nome, usuario_email) 
    VALUES($1, $2, $3) 
    RETURNING id, codigo;
  `;

  try {
    const result = await db.query(insertQuery, [
      codigo,
      usuarioNome,
      usuarioEmail,
    ]);
    res.status(201).json({ message: "Cupom criado!", cupom: result.rows[0] });
  } catch (error) {
    console.error("Erro ao inserir cupom:", error);
    res.status(500).json({ error: "Erro interno ao salvar o cupom." });
  }
});

app.get("/cupons/validar/:codigo", async (req, res) => {
  const { codigo } = req.params;

  const selectQuery = `
    SELECT codigo, utilizado, data_criacao 
    FROM cupons 
    WHERE codigo = $1;
  `;

  try {
    const { rows } = await db.query(selectQuery, [codigo]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ valido: false, message: "Cupom inválido." });
    }

    const cupom = rows[0];

    if (cupom.utilizado) {
      return res
        .status(400)
        .json({ valido: false, message: "Este cupom já foi utilizado." });
    }

    res.status(200).json({ valido: true, message: "Cupom válido!", cupom });
  } catch (error) {
    console.error("Erro ao validar cupom:", error);
    res.status(500).json({ error: "Erro interno ao validar o cupom." });
  }
});

app.patch("/cupons/utilizar/:codigo", async (req, res) => {
  const { codigo } = req.params;

  const selectQuery = "SELECT * FROM cupons WHERE codigo = $1";
  const { rows } = await db.query(selectQuery, [codigo]);

  if (rows.length === 0) {
    return res.status(404).json({ error: "Cupom não encontrado." });
  }

  const cupom = rows[0];
  if (cupom.utilizado) {
    return res.status(400).json({ error: "Este cupom já foi utilizado." });
  }

  const updateQuery = `
    UPDATE cupons 
    SET utilizado = TRUE 
    WHERE codigo = $1 
    RETURNING codigo, utilizado;
  `;

  try {
    const result = await db.query(updateQuery, [codigo]);
    res
      .status(200)
      .json({ message: "Cupom utilizado com sucesso!", cupom: result.rows[0] });
  } catch (error) {
    console.error("Erro ao utilizar cupom:", error);
    res.status(500).json({ error: "Erro interno ao utilizar o cupom." });
  }
});

app.post("/admin/login", (req, res) => {
  const { senha } = req.body;

  if (!senha) {
    return res.status(400).json({ error: "Senha é obrigatória." });
  }

  if (senha === process.env.ADMIN_PASSWORD) {
    res.status(200).json({ message: "Login bem-sucedido." });
  } else {
    res.status(401).json({ error: "Senha incorreta." });
  }
});

app.use(errorHandler);

export default app;
