"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRouter = void 0;
const express_1 = require("express");
const customer_controller_1 = require("../controller/customer-controller");
const router = (0, express_1.Router)();
router.route('/')
    .get(customer_controller_1.getAllCustomer)
    .post(customer_controller_1.createCustomer);
exports.CustomerRouter = router;
