import { Router } from "express";
import { validateProduct } from "../middlewares/validate";
import { createProduct, getAllProduct } from "../controller/product.controller";

const router = Router()

router.route('/')
  .get(getAllProduct)
  .post(validateProduct, createProduct)

router
// .route("/:productId")
// .get(getCustomer)
// .patch(validateUpdateCustomer, updateCustomer)
// .delete(deleteCustomer)
export const ProductRoute = router