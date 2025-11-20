import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import userRoutes from "./routes/user.routes.js";
import produtoRoutes from "./routes/produto.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(limiter);

app.use("/users", userRoutes);
app.use("/produtos", produtoRoutes);
app.use("/wishlist", wishlistRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando!" });
});

export default app;
