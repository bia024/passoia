// src/routes/produto.routes.js
import { Router } from "express";
import {
  getProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto,
} from "../controllers/produto.controller.js";

const router = Router();

router.get("/", getProdutos);
router.get("/:id", getProdutoById);
router.post("/", createProduto);
router.put("/:id", updateProduto);
router.delete("/:id", deleteProduto);

export default router;
