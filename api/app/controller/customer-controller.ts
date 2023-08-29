import { NextFunction, Request, Response } from "express";
import { Customer } from "../database/prisma";
import { getOffset } from "../utils/paginate-offset";



export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, phone, email, address } = req.body
    const customer = await Customer.create({
      data: {
        name,
        phone,
        email,
        address
      }
    })
    res.status(201).json({
      success: true,
      message: "created",
      data: customer
    })
  }
  catch (err) {
    next(err)
  }
}


export const getAllCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {

    let { page, size } = req.body
    if (!size || size < 10) size = 10
    const offset = getOffset(page, size)

    const customers = await Customer.findMany({
      skip: offset,
      take: size
    })

    res.status(200).json({
      success: true,
      count: customers.length,
      message: "success",
      data: customers
    })
  }
  catch (err) {
    next(err)
  }
}

export const getCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = req.params.customerId
    const customer = await Customer.findFirst({
      where: {
        id: customerId
      }
    })
    if (!customer) {
      res.status(404).json({
        success: false,
        message: "notfound",
        data: customer
      })
      return
    }
    res.status(201).json({
      success: true,
      message: "success",
      data: customer
    })
  }
  catch (err) {
    next(err)
  }
}
