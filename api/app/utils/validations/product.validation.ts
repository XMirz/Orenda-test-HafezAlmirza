import Joi from 'joi'

export const productValidation = (product: any) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(40).required(),
    unit: Joi.number().greater(0).less(999).required(),
    price: Joi.number().greater(0).required()
  })

  return schema.validate(product, { abortEarly: false })
}