import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

export const Customer = prisma.customer
export const Product = prisma.product
export const Order = prisma.order
export const OrderDetail = prisma.orderDetail