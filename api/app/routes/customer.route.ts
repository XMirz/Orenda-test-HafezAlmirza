import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomer,
  getCustomer,
  getFullCustomer,
  updateCustomer,
} from "../controller/customer.controller";
import {
  validateCreateCustomer,
  validateUpdateCustomer,
} from "../middlewares/validate";

const router = Router();

router
  .route("/")
  .get(getAllCustomer)
  .post(validateCreateCustomer, createCustomer);

router.get("/full", getFullCustomer);

router
  .route("/:customerId")
  .get(getCustomer)
  .patch(validateUpdateCustomer, updateCustomer)
  .delete(deleteCustomer);
export const CustomerRouter = router;
