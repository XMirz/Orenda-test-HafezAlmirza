import { NextFunction, Request, Response } from "express";
import { customerValidation } from "../utils/validations/customer.validation";
import { BadRequest, NotFound } from "../utils/errors";
import { productValidation } from "../utils/validations/product.validation";
import { cartValidation } from "../utils/validations/cart.validation";
import { Customer, Product } from "../database/prisma";

export const validateCreateCustomer = (req: Request, res: Response, next: NextFunction) => {
  try {
    let { name, phone, email, address } = req.body
    const { error } = customerValidation({ name, phone, email, address })

    if (error) {
      const messages = error.details.map(error => error.message).join(",  ");
      throw new BadRequest(messages)
    } else next()

  }
  catch (error) {
    next(error)
  }
}
export const validateUpdateCustomer = (req: Request, res: Response, next: NextFunction) => {
  try {
    let { name, phone, email, address } = req.body
    const { error } = customerValidation({ name, phone, email, address })
    if (error) {
      const messages = error.details.map(error => error.message).join(",  ");
      throw new BadRequest(messages)
    } else next()

  } catch (error) {
    next(error)
  }
}

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  try {
    let { name, unit, price } = req.body
    const { error } = productValidation({ name, price, unit })
    if (error) {
      const messages = error.details.map(error => error.message).join(",  ");
      throw new BadRequest(messages)
    } else next()

  } catch (error) {
    next(error)
  }
}

export const validateAddCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerId, productId, quantity } = req.body
    const { error } = cartValidation({ customerId, productId, quantity, })
    if (error) {
      const messages = error.details.map(error => error.message).join(",  ");
      throw new BadRequest(messages)
    }

    const product = await Product.findUnique({
      where: {
        id: productId
      },
    })

    const customer = await Customer.findFirst({
      where: {
        id: customerId
      }
    })

    if (!customer) throw new NotFound("Customer not found")
    if (!product) throw new NotFound("Product not found")
    if (product.unit < quantity) throw new BadRequest("Quantity invalid")
    req.body.quantity = parseInt(req.body.quantity)
    req.body.productUnit = product.unit
    // req.body.price = product.price
    // req.body.subTotal = quantity * product.price
    next()

  } catch (error) {
    next(error)
  }
}