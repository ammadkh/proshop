import express from "express";
import {
  getProductById,
  getProducts,
} from "../controllers/productController.js";

export const productRoutes = express.Router();

productRoutes.route("/").get(getProducts);

productRoutes.route("/:id").get(getProductById);
