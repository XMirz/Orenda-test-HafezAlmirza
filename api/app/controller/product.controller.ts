import { NextFunction, Request, Response } from "express";
import { Product } from "../database/prisma";
import { getOffset } from "../utils/paginate-offset";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { name, unit, price } = req.body
    unit = parseInt(unit)
    price = parseInt(price)
    const product = await Product.create({
      data: {
        name,
        unit,
        price
      }
    })
    res.status(201).json({
      success: true,
      message: "product",
      data: product
    })
  }
  catch (err) {
    next(err)
  }
}

export const getAllProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let take
    let { page, size } = req.query

    take = parseInt(size as string)
    if (!take || take < 10) take = 10
    const offset = getOffset(parseInt(page as string), take)

    const customers = await Product.findMany({
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