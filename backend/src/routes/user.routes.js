import { Router } from "express";
import {
  createUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
  registerUser
} from "../controllers/user.controller.js";

const router = Router();

// CADASTRO
router.post("/cadastro", registerUser);

// CRUD
router.post("/", createUser);
router.get("/", listUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
