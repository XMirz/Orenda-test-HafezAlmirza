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
    let take
    let { page, size } = req.query

    take = parseInt(size as string)
    if (!take || take < 10) take = 10
    const offset = getOffset(parseInt(page as string), take)

    const customers = await Customer.findMany({
      skip: offset,
      take: take
    })

    res.status(200).json({
      success: true,
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
    return handleCustomerExist(res, customer)
  }
  catch (err) {
    next(err)
  }
}

export const updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, phone, email, address } = req.body
    const customerId = req.params.customerId
    const customer = await Customer.update({
      where: {
        id: customerId
      },
      data: {
        name,
        phone,
        email,
        address
      }
    })

    return handleCustomerExist(res, customer)
  }
  catch (err) {
    next(err)
  }
}

export const deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = req.params.customerId
    const customer = await Customer.delete({
      where: {
        id: customerId
      },
    })
    return handleCustomerExist(res, customer)
  }
  catch (err) {
    next(err)
  }
}

export const handleCustomerExist = (res: Response, customer: any) => {
  if (!customer) {
    res.status(404).json({
      success: false,
      message: "notfound",
    })
    return
  }
  res.status(200).json({
    success: true,
    message: "success",
    data: customer
  })
}