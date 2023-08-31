import { NextFunction, Request, Response } from "express";
import { OrderDetail } from "../database/prisma";
import { BadRequest } from "../utils/errors";


export const getCustomerCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = req.params.customerId
    const orderDetails = await OrderDetail.findMany({
      where: {
        customerId: customerId,
        orderId: null
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
export const AddToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerId, productId, quantity } = req.body

    const orderDetail = await OrderDetail.create({
      data: {
        productId: productId,
        customerId: customerId,
        quantity: quantity,
      }
    })
    res.status(201).json({
      success: true,
      message: "success",
      data: orderDetail
    })
  }
  catch (err) {
    next(err)
  }
}

export const UpdateIfExistInCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerId, productId, productUnit, quantity, price, subTotal } = req.body
    const lastOrderDetail = await OrderDetail.findFirst({
      where: {
        productId: productId,
        customerId: customerId,
        orderId: null
      },
    })

    if (lastOrderDetail) {
      const newQuantity = lastOrderDetail.quantity + quantity
      if (productUnit < newQuantity) throw new BadRequest("Quantity invalid")
      const orderDetail = await OrderDetail.update({
        where: {
          id: lastOrderDetail.id,
        },
        data: {
          quantity: lastOrderDetail.quantity + quantity
        }
      })
      res.status(201).json({
        success: true,
        message: "success",
        data: orderDetail
      })
    } else next()
  }
  catch (err) {
    next(err)
  }
}