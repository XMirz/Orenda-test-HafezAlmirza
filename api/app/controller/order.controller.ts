import { NextFunction, Request, Response } from "express";
import { Customer, Order, OrderDetail, Product, prisma } from "../database/prisma";
import { AppError, BadRequest } from "../utils/errors";

export const getCustomerOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = req.params.customerId
    const orderDetails = await Order.findMany({
      where: {
        customerId: customerId,
      },
      include: {
        OrderDetail: true
      }
    })
    res.status(200).json({
      success: true,
      message: "success",
      data: orderDetails
    })
  }
  catch (err) {
    next(err)
  }

}
export const completeOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const discount = parseInt(req.params.discount) || 0
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

    // Create the order row
    const order = await Order.create({
      data: {
        customerId: customer.id,
        address: customer.address,
        total: total,
        discount: discount
      }
    })

    // Update the order detail price, subTotal , orderId,
    await prisma.$transaction(
      orderDetails.map(orderDetail => {
        const product = products.filter(prod => prod.id === orderDetail.productId).at(0)
        return OrderDetail.update({
          where: { id: orderDetail.id },
          data: {
            orderId: order.id,
            price: product!!.price,
            subTotal: orderDetail.quantity * product!!.price,
          }
        })
      })
    )

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