const { Router } = require("express");
const { createCustomer, getAllCustomer } = require("../controller/customer-controller")

const router = Router()

router.route('/')
  .get(getAllCustomer)
  .post(createCustomer,)


module.exports.CustomerRouter = router