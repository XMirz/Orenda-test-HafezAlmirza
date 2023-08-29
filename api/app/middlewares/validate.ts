import { NextFunction, Request, Response } from "express";
import { createCustomerValidation } from "../utils/validations/customer.validation";
import { BadRequest } from "../utils/errors";

export const validateCreateCustomer = (req: Request, res: Response, next: NextFunction) => {
  try {
    let { name, phone, email, address } = req.body
    const { error } = createCustomerValidation({ name, phone, email, address })

    if (error) {
      const messages = error.details.map(error => error.message).join(",  ");
      console.log(messages);

      throw new BadRequest(messages)
    } else next()

  }
  catch (error) {
    next(error)
  }
}