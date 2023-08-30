import { NextFunction, Request, Response } from "express";
import { Customer, Order, OrderDetail, Product, prisma } from "../database/prisma";
import { AppError, BadRequest } from "../utils/errors";

export const getCustomerOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = req.params.customerId
    const customer = await Customer.findUnique({
      where: {
        id: customerId,
      },
      include: {
        Order: {
          include: {
            OrderDetail: true
          }
        }
      }
    })
    res.status(200).json({
      success: true,
      message: "success",
      data: customer
    })
  }
  catch (err) {
    next(err)
  }

}
export const completeOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const discount = parseInt(req.query.discount as string) || 0

    const orderDetailIds = req.body

    // Get all product in cart based onjson
    const orderDetails = await OrderDetail.findMany({
      where: {
        id: { in: orderDetailIds },
        orderId: null
      }
    })
    // Throw error when an id or more not found
    if (orderDetailIds.length != orderDetails.length) throw new BadRequest("Order invalid")

    // Get the customer data
    const customer = await Customer.findUnique({
      where: {
        id: orderDetails.at(0)?.customerId
      }
    })
    // Throw error if customer not found
    if (!customer) throw new AppError("Internal error")

    // Get all productId from orderdetails
    const productIds: string[] = []
    orderDetails.forEach(orderDetail => {
      productIds.push(orderDetail.productId)
    })

    // Get the corresponding product based on the id given
    const products = await Product.findMany({
      where: {
        id: { in: productIds }
      }
    })


    // Count the total price
    let total = 0;
    orderDetails.map(orderDetail => {
      const product = products.filter(prod => prod.id === orderDetail.productId).at(0)
      total += orderDetail.quantity * product!!.price
    })
    total = total - (total * discount / 100)

    // Create the order row
    const order = await Order.create({
      data: {
        customerId: customer!!.id,
        address: customer!!.address,
        total: total,
        discount: discount
      }
    })

    let transactions: any[] = []
    orderDetails.map(orderDetail => {
      const product = products.filter(prod => prod.id === orderDetail.productId).at(0)
      // Update the order detail price, subTotal , orderId,
      transactions.push(
        OrderDetail.update({
          where: { id: orderDetail.id },
          data: {
            orderId: order.id,
            price: product!!.price,
            subTotal: orderDetail.quantity * product!!.price,
          }
        }))
      // Update unit in productId
      transactions.push(
        Product.update({
          where: { id: orderDetail.productId },
          data: {
            unit: product!!.unit - orderDetail.quantity
          }
        })
      )
    })
    await prisma.$transaction(transactions)


    // Get the full order details
    const orderFull = await Order.findUnique({
      where: {
        id: order.id
      },
      include: {
        OrderDetail: true
      }
    })
    res.status(200).json({
      success: true,
      message: "success",
      data: orderFull
    })

  }
  catch (err) {
    next(err)
  }
}