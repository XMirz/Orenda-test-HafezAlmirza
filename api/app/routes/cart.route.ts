import { Router } from "express";
import { validateAddCart } from "../middlewares/validate";
import { AddToCart } from "../controller/cart.controller";
import { UpdateIfExistInCart } from "../controller/cart.controller";
const router = Router()
router.route('/')
  .post(
    validateAddCart,
    UpdateIfExistInCart,
    AddToCart)

export const CartRoute = router