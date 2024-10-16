import express from "express";

import {
  getProduk,
  getProdukById,
  createProduk,
  updateProduk,
  deleteProduk,
} from "../controllers/ProdukController.js";

const router = express.Router();

router.get("/produk", getProduk);
router.get("/produk/:id", getProdukById);
router.post("/produk", createProduk);
router.patch("/produk/:id", updateProduk);
router.delete("/produk/:id", deleteProduk);

export default router;
