import { cartSchema } from "./cart"
import { customerSchema } from "./customers"

export const orderSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: '044b85d5-07b2-4105-aa43-a5e4f225ef4d',
    },
    address: {
      type: 'string',
      example: 'Jl. Sumatra Tengah No. 12, Kota Pekanbaru, Riau',
    },
    total: {
      type: 'integer',
      example: '20000',
    },
    discount: {
      type: 'integer',
      example: '2',
    },
    customerId: {
      type: 'fadf97e6-c354-4186-ae38-c6dc56234287',
      example: 'Hafez Almirza',
    },
    createdAt: {
      type: 'string',
      example: '2023-08-31T03:38:37.672Z',
    },
    updatedAt: {
      type: 'string',
      example: '2023-08-31T03:38:37.672Z',
    },
    OrderDetail: {
      type: 'array',
      items: cartSchema
    }
  },
}

export const customerOrderSchema = {
  type: 'object',
  properties: {
    ...customerSchema.properties,
    Order: {
      type: 'array',
      items: orderSchema
    }
  },
}

export const getCustomerOrders = {
  tags: ['Order'],
  summary: 'Fetch orders of a customer',
  description: 'Fetch orders of a customer based on customerId',
  operationId: 'getCustomerOrders',
  responses: {
    '200': {
      description: 'Successfull operation',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: {
                type: 'boolean',
                example: true,
              },
              message: {
                type: 'string',
                example: 'success'
              },
              data: customerOrderSchema
            },
          }
        },
      },
    },
  },
}

export const completeOrder = {
  tags: ['Order'],
  summary: 'Checkout customer cart to an order',
  description: 'Checkout customer cart to an order',
  operationId: 'completeOrder',
  parameters: [
    {
      name: 'discount',
      example: "50",
      in: 'query',
      description: 'Lumpsum discount for an order',
      required: false,
      type: 'integer',
    },
  ],
  requestBody: {
    description: 'List of customer unordered products in cart',
    content: {
      'application/json': {
        schema: {
          type: "array",
          items: {
            type: "string",
            example: "5f155abb-0901-4fb4-9b8b-991d5a0639ed"
          }
        },
      },
    },
    required: true,
  },
  responses: {
    '200': {
      description: 'Successfull operation',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: {
                type: 'boolean',
                example: true,
              },
              message: {
                type: 'string',
                example: 'success'
              },
              data: orderSchema
            },
          }
        },
      },
    },
  },
}