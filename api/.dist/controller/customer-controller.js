"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomer = exports.getAllCustomer = void 0;
const prisma_1 = require("../database/prisma");
const paginate_offset_1 = require("../utils/paginate-offset");
const getAllCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { page, size } = req.body;
        if (!size || size < 10)
            size = 10;
        const offset = (0, paginate_offset_1.getOffset)(page, size);
        const customers = yield prisma_1.Customer.findMany({
            skip: offset,
            take: size
        });
        res.status(200).json({
            success: true,
            message: "success",
            data: customers
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.getAllCustomer = getAllCustomer;
const createCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone, email, address } = req.body;
        const customer = yield prisma_1.Customer.create({
            data: {
                name,
                phone,
                email,
                address
            }
        });
        res.status(201).json({
            success: true,
            message: "created",
            data: customer
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.createCustomer = createCustomer;
