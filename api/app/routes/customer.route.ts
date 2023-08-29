import { Router } from "express";
import { createCustomer, getAllCustomer, getCustomer } from "../controller/customer-controller"
import { validateCreateCustomer } from "../middlewares/validate";

const router = Router()

router.route('/')
  .get(getAllCustomer)
  .post(validateCreateCustomer, createCustomer)

router
  .route("/:customerId")
  .get(
    getCustomer)
  .put(
)
export const CustomerRouter = router