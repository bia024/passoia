// src/routes/wishlist.routes.js
import { Router } from "express";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlistByUser,
} from "../controllers/wishlist.controller.js";

const router = Router();

router.post("/", addToWishlist);
router.delete("/:userId/:produtoId", removeFromWishlist);
router.get("/:userId", getWishlistByUser);

export default router;
