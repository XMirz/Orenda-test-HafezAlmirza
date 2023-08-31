import { NextFunction, Request, Response } from "express";
import { Product, prisma } from "../database/prisma";
import { getOffset } from "../utils/paginate-offset";
import { Product as ProductType } from "@prisma/client";

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
      message: "success",
      data: product
    })
  }
  catch (err) {
    next(err)
  }
}

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let take
    let currentPage;
    let { page, size } = req.query

    take = parseInt(size as string)
    currentPage = parseInt(page as string);
    if (!take || take < 10) take = 10
    if (!currentPage || currentPage < 1) currentPage = 1;
    const offset = getOffset(currentPage, take)

    const [products, count] = await prisma.$transaction([
      Product.findMany({
        skip: offset,
        take: take,
        orderBy: {
          createdAt: "desc",
        },
      }),
      Product.count()
    ])

    res.status(200).json({
      success: true,
      message: "success",
      pagination: {
        size: take,
        page: currentPage,
        totalPage: Math.ceil(count / take),
        total: count,
      },
      data: products
    })
  }
  catch (err) {
    next(err)
  }
}

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.productId

    const product = await Product.findUnique({
      where: {
        id: productId
      },
    })
    return handleProductResponse(res, product)
  }
  catch (err) {
    next(err)
  }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.productId
    let { name, unit, price } = req.body
    unit = parseInt(unit)
    price = parseInt(price)

    const product = await Product.update({
      where: {
        id: productId
      },
      data: {
        name,
        unit,
        price
      }
    })
    return handleProductResponse(res, product)
  }
  catch (err) {
    next(err)
  }
}


export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.productId

    const product = await Product.delete({
      where: {
        id: productId
      },
    })
    return handleProductResponse(res, product)
  }
  catch (err) {
    next(err)
  }
}




export const handleProductResponse = (res: Response, product: ProductType | null) => {
  if (!product) {
    res.status(404).json({
      success: false,
      message: "notfound",
    })
    return
  }
  res.status(200).json({
    success: true,
    message: "success",
    data: product
  })
}