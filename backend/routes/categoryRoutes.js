import express from "express";
const router = express.Router();
import {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getCategories).post(protect, admin, createCategory);
router.route("/:id").get(getCategoryById);
router.route("/:id/update").put(protect, admin, updateCategory);
router.route("/:id/delete").delete(protect, admin, deleteCategory);

export default router;
