import { Router } from "express";
import { validateProduct } from "../middlewares/validate";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controller/product.controller";

const router = Router()

router.route('/')
  .get(getAllProducts)
  .post(validateProduct, createProduct)

router
  .route("/:productId")
  .get(getProduct)
  .patch(validateProduct, updateProduct)
  .delete(deleteProduct)
export const ProductRoute = router