import Joi from 'joi'

const extendedJoi = Joi.extend(require('joi-phone-number'))

export const customerValidation = (customer: any) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(40).required(),
    phone: extendedJoi.string().phoneNumber({ defaultCountry: 'ID', format: 'e164' }).required(),
    email: Joi.string().email().required(),
    address: Joi.string().min(10).max(100).required()
  })

  return schema.validate(customer, { abortEarly: false })
}
// export const updateCustomerValidation = (customer: any) => {
//   const schema = Joi.object({
//     name: Joi.string().min(4).max(40).required(),
//     phone: extendedJoi.string().phoneNumber({ defaultCountry: 'ID', format: 'e164' }).required(),
//     email: Joi.string().email().required(),
//     address: Joi.string().min(10).max(100).required()
//   })

//   return schema.validate(customer, { abortEarly: false })
// }