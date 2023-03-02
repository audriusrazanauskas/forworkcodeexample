import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  addProductSupplier,
  deleteProductSupplier,
  updateProductSupplier,
  UpdateProductSupplierById,
  getProductSuppliers,
  getProductsByCategoryId,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/category/:id").get(getProductsByCategoryId);
router.route("/:id/reviews").post(protect, createProductReview);
router
  .route("/:id/suppliers")
  .get(protect, getProductSuppliers)
  .post(protect, addProductSupplier)
  .put(protect, admin, updateProductSupplier);

router
  .route("/:id/suppliers/:supplierId")
  .put(protect, admin, UpdateProductSupplierById)
  .delete(protect, admin, deleteProductSupplier);

router.get("/top", getTopProducts);
router.route("/:id").get(getProductById).put(protect, admin, updateProduct);
router.delete("/:id/delete", protect, admin, deleteProduct);

export default router;
