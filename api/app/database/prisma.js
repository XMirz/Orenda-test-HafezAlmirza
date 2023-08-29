const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient

module.exports.Customer = prisma.customer
module.exports.Product = prisma.product
module.exports.Order = prisma.order
module.exports.OrderDetail = prisma.orderDetail