"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const customer_1 = require("./routes/customer");
const app = (0, express_1.default)();
app.use("/api/customers", customer_1.CustomerRouter);
app.listen(process.env.PORT, () => {
    console.log(`Running express app in http://localhost:${process.env.PORT}`);
});
