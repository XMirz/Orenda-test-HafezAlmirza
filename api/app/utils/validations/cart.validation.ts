import Joi from 'joi'


export const cartValidation = (productDetail: any) => {
  const schema = Joi.object({
    quantity: Joi.number().min(1).required(),
    customerId: Joi.string().required(),
    productId: Joi.string().required(),
  })

  return schema.validate(productDetail, { abortEarly: false })
}