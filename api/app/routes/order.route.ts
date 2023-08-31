import { Router } from "express";
import { validateOrder } from "../middlewares/validate";
import { completeOrder, getCustomerOrder } from "../controller/order.controller";
const router = Router()
router.route('/')
  .post(
    validateOrder, completeOrder)
router.get("/:customerId", getCustomerOrder)

export const OrderRoute = router