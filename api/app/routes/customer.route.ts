import { Router } from "express";
import { createCustomer, deleteCustomer, getAllCustomer, getCustomer, updateCustomer } from "../controller/customer.controller"
import { validateCreateCustomer, validateUpdateCustomer } from "../middlewares/validate";

const router = Router()

router.route('/')
  .get(getAllCustomer)
  .post(validateCreateCustomer, createCustomer)

router
  .route("/:customerId")
  .get(getCustomer)
  .patch(validateUpdateCustomer, updateCustomer)
  .delete(deleteCustomer)
export const CustomerRouter = router