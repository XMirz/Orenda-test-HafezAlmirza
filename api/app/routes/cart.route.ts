import { Router } from "express";
import { validateAddCart } from "../middlewares/validate";
import { AddToCart, getCustomerCart } from "../controller/cart.controller";
import { UpdateIfExistInCart } from "../controller/cart.controller";
const router = Router()
router.route('/')
  .post(
    validateAddCart,
    UpdateIfExistInCart,
    AddToCart)
router.get("/:customerId", getCustomerCart)
export const CartRoute = router