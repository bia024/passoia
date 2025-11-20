import { Router } from "express";
import {
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/cadastro", registerUser);
router.post("/login", loginUser);

router.get("/", listUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
