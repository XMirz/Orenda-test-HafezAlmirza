import { NextFunction, Request, Response } from "express";
import { customerValidation } from "../utils/validations/customer.validation";
import { BadRequest } from "../utils/errors";
import { productValidation } from "../utils/validations/product.validation";

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