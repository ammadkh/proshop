import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

export const productRoutes = express.Router();

productRoutes.route("/").get(getProducts).post(protect, admin, createProduct);
productRoutes.route("/top").get(getTopProducts);
productRoutes
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

productRoutes.route("/:id/reviews").post(protect, createProductReview);
