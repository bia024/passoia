// src/controllers/wishlist.controller.js
import prisma from "../prisma/client.js";

export const addToWishlist = async (req, res) => {
  try {
    const { userId, produtoId } = req.body;
    const exists = await prisma.wishlistItem.findUnique({
      where: {
        userId_produtoId: {
          userId: Number(userId),
          produtoId: Number(produtoId),
        },
      },
    });

    if (exists)
      return res.status(409).json({ error: "Item já está na wishlist." });

    const item = await prisma.wishlistItem.create({
      data: { userId: Number(userId), produtoId: Number(produtoId) },
    });

    return res.status(201).json(item);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, produtoId } = req.params;
    await prisma.wishlistItem.delete({
      where: {
        userId_produtoId: {
          userId: Number(userId),
          produtoId: Number(produtoId),
        },
      },
    });
    return res.json({ message: "Removido da wishlist" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getWishlistByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const items = await prisma.wishlistItem.findMany({
      where: { userId: Number(userId) },
      include: { produto: true },
    });
    return res.json(items);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
