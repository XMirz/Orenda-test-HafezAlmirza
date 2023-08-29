"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetail = exports.Order = exports.Product = exports.Customer = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient;
exports.Customer = prisma.customer;
exports.Product = prisma.product;
exports.Order = prisma.order;
exports.OrderDetail = prisma.orderDetail;
