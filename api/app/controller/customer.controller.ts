import { NextFunction, Request, Response } from "express";
import { Customer, prisma } from "../database/prisma";
import { getOffset } from "../utils/paginate-offset";
import { Customer as CustomerType } from "@prisma/client";

export const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, phone, email, address } = req.body;
    const customer = await Customer.create({
      data: {
        name,
        phone,
        email,
        address,
      },
    });
    res.status(201).json({
      success: true,
      message: "created",
      data: customer,
    });
  } catch (err) {
    next(err);
  }
};

export const getFullCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customers = await Customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      message: "success",
      data: customers,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let take;
    let currentPage;
    let { page, size } = req.query;

    take = parseInt(size as string);
    currentPage = parseInt(page as string);
    if (!currentPage || currentPage < 1) currentPage = 1;
    if (!take || take < 10) take = 10;
    const offset = getOffset(currentPage, take);

    const [customers, count] = await prisma.$transaction([
      Customer.findMany({
        skip: offset,
        take: take,
        orderBy: {
          createdAt: "desc",
        },
      }),
      Customer.count(),
    ]);

    res.status(200).json({
      success: true,
      message: "success",
      pagination: {
        size: take,
        page: currentPage,
        totalPage: Math.ceil(count / take),
        total: count,
      },
      data: customers,
    });
  } catch (err) {
    next(err);
  }
};

export const getCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = req.params.customerId;
    const customer = await Customer.findFirst({
      where: {
        id: customerId,
      },
    });
    return handleCustomerResponse(res, customer);
  } catch (err) {
    next(err);
  }
};

export const updateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, phone, email, address } = req.body;
    const customerId = req.params.customerId;
    const customer = await Customer.update({
      where: {
        id: customerId,
      },
      data: {
        name,
        phone,
        email,
        address,
      },
    });

    return handleCustomerResponse(res, customer);
  } catch (err) {
    next(err);
  }
};

export const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = req.params.customerId;
    const customer = await Customer.delete({
      where: {
        id: customerId,
      },
    });
    return handleCustomerResponse(res, customer);
  } catch (err) {
    next(err);
  }
};

export const handleCustomerResponse = (
  res: Response,
  customer: CustomerType | null
) => {
  if (!customer) {
    res.status(404).json({
      success: false,
      message: "notfound",
    });
    return;
  }
  res.status(200).json({
    success: true,
    message: "success",
    data: customer,
  });
};
