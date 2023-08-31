export const cartSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: '044b85d5-07b2-4105-aa43-a5e4f225ef4d',
    },
    price: {
      type: 'integer',
      example: '10000',
    },
    subTotal: {
      type: 'integer',
      example: '20000',
    },
    customerId: {
      type: 'fadf97e6-c354-4186-ae38-c6dc56234287',
      example: 'Bugatti Chiron',
    },
    productId: {
      type: 'string',
      example: 'a73e0954-70eb-4a98-861d-dd3a29eefe59',
    },
    quantity: {
      type: 'integer',
      example: '2',
    },
    createdAt: {
      type: 'string',
      example: '2023-08-31T03:38:37.672Z',
    },
    updatedAt: {
      type: 'string',
      example: '2023-08-31T03:38:37.672Z',
    },
  },
}

const addToCardBody = {
  type: 'object',
  required: ["name", "unit", "price",],
  properties: {
    customerId: {
      type: 'string',
      example: 'fadf97e6-c354-4186-ae38-c6dc56234287',
    },
    productId: {
      type: 'string',
      example: 'a73e0954-70eb-4a98-861d-dd3a29eefe59',
    },
    quantity: {
      type: 'integer',
      example: '2',
    },
  },
}

export const cartSuccessSchema = {
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
    data: cartSchema
  },
}

export const addToCart = {
  tags: ['Cart'],
  summary: 'Add product to customer cart',
  description: 'Add product to customer cart included quantity',
  operationId: 'createProduct',
  requestBody: {
    description: 'Add product to customer cart included quantity',
    content: {
      'application/json': {
        schema: addToCardBody,
      },
    },
    required: true,
  },

  responses: {
    '201': {
      description: 'Successfull operation',
      content: {
        'application/json': {
          schema: cartSuccessSchema
        },
      },
    },
  },
}

export const getCustomerCart = {
  tags: ['Cart'],
  summary: 'Fetch cart products of a customer',
  description: 'Fetch cart of a customer based on customerId',
  operationId: 'getProduct',
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
              data: {
                type: "array",
                items: cartSchema
              }
            },
          }
        },
      },
    },
  },
};