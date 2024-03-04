import express from "express";
import {
  authUser,
  deleteUsers,
  getUserProfile,
  getUsers,
  getUsersById,
  logoutUser,
  registerUser,
  updateUserProfile,
  updateUsers,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

export const userRoutes = express.Router();

userRoutes.route("/").post(registerUser).get(protect, admin, getUsers);

userRoutes.post("/logout", logoutUser);
userRoutes.post("/login", authUser);
userRoutes
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
userRoutes
  .route("/:id")
  .delete(protect, admin, deleteUsers)
  .get(protect, admin, getUsersById)
  .put(protect, admin, updateUsers);
