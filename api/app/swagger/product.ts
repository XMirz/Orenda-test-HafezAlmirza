import { paginationSchema } from "./customers";

export const productSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: '044b85d5-07b2-4105-aa43-a5e4f225ef4d',
    },
    name: {
      type: 'string',
      example: 'Bugatti Chiron',
    },
    unit: {
      type: 'integer',
      example: '175',
    },
    price: {
      type: 'integer',
      example: '34000000',
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

export const productSuccessSchema = {
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
    data: productSchema
  },
}

export const createProductBody = {
  type: 'object',
  required: ["name", "unit", "price",],
  properties: {
    name: {
      type: 'string',
      example: 'Bugatti Chiron',
    },
    unit: {
      type: 'integer',
      example: '175',
    },
    price: {
      type: 'integer',
      example: '34000000',
    },
  },
}

export const createProduct = {
  tags: ['Products'],
  summary: 'Create a product data',
  description: 'Create a product data',
  operationId: 'createProduct',
  requestBody: {
    description: 'Create a product data based on input',
    content: {
      'application/x-www-form-urlencoded': {
        schema: createProductBody,
      },
    },
    required: true,
  },

  responses: {
    '201': {
      description: 'Successfull operation',
      content: {
        'application/json': {
          schema: productSuccessSchema
        },
      },
    },
  },
};


export const getAllProducts = {
  tags: ['Products'],
  summary: 'Fetch products data',
  description: 'Fetch products data',
  operationId: 'getAllProducts',
  parameters: [
    {
      name: 'page',
      example: "1",
      in: 'query',
      description: 'Pagination',
      required: false,
      type: 'integer',
    },
    {
      name: 'size',
      example: "10",
      in: 'query',
      description: 'Pagination Size',
      required: false,
      type: 'integer',
    },
  ],
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
              pagiantion: paginationSchema,
              data: {
                type: "array",
                items: productSchema
              }
            },
          }
        },
      },
    },
  },
};

export const getProduct = {
  tags: ['Products'],
  summary: 'Fetch a product data',
  description: 'Fetch a product data',
  operationId: 'getProduct',
  responses: {
    '200': {
      description: 'Successfull operation',
      content: {
        'application/json': {
          schema: productSuccessSchema
        },
      },
    },
  },
};


export const updateProduct = {
  tags: ['Products'],
  summary: 'Update a product data',
  description: 'Update a product data',
  operationId: 'updateProduct',
  requestBody: {
    description: 'Update Product data based on input',
    content: {
      'application/x-www-form-urlencoded': {
        schema: createProductBody,
      },
    },
    required: true,
  },

  responses: {
    '200': {
      description: 'Successfull operation',
      content: {
        'application/json': {
          schema: productSuccessSchema
        },
      },
    },
  },
};

export const deleteProduct = {
  tags: ['Products'],
  summary: 'Delete a product data',
  description: 'Delete a product data',
  operationId: 'deleteProduct',
  responses: {
    '200': {
      description: 'Successfull operation',
      content: {
        'application/json': {
          schema: productSuccessSchema
        },
      },
    },
  },
};