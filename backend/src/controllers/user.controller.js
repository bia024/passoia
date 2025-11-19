import {
  createUserService,
  listUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService
} from "../services/user.service.js";

export const createUser = async (req, res) => {
  try {
    const user = await createUserService(req.body);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await listUsersService();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(Number(req.params.id));
    return res.json(user);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updated = await updateUserService(
      Number(req.params.id),
      req.body
    );
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await deleteUserService(Number(req.params.id));
    return res.status(204).send();
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};
