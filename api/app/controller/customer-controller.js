const { Customer } = require("../database/prisma");
const { getOffset } = require("../utils/paginate-offset");

module.exports.getAllCustomer = async (req, res, next) => {
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
      message: "success",
      data: customers
    })
  }
  catch (err) {
    console.log(err);
    next(err)
  }
}

module.exports.createCustomer = async (req, res, next) => {
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
    console.log(err);
    next(err)
  }
}
