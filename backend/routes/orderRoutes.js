import express from "express";

import { admin, protect } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController.js";

export const orderRoutes = express.Router();

orderRoutes
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);

orderRoutes.route("/mine").get(protect, getMyOrders);
orderRoutes.route("/:id").get(protect, getOrderById);
orderRoutes.route("/:id/pay").put(protect, admin, updateOrderToPaid);
orderRoutes.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
