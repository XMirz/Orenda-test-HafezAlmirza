export const paginationSchema = {
  type: 'object',
  properties: {
    size: {
      type: 'integer',
      example: '10',
    },
    page: {
      type: 'integer',
      example: '2',
    },
    total: {
      type: 'integer',
      example: '2123',
    },
    totalPage: {
      type: 'integer',
      example: '21',
    },
  }
}

export const customerSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: '044b85d5-07b2-4105-aa43-a5e4f225ef4d',
    },
    name: {
      type: 'string',
      example: 'Hafez Almirza',
    },
    email: {
      type: 'string',
      example: 'hafezalmirza@gmail.com',
    },
    phone: {
      type: 'string',
      example: '19028738571',
    },
    address: {
      type: 'string',
      example: 'Jl. Sumatra Tengah No. 12, Kota Pekanbaru, Riau',
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

export const customerSuccessSchema = {
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
    data: customerSchema
  },
}

export const createCustomerBody = {
  type: 'object',
  required: ["name", "email", "phone", "address"],
  properties: {
    name: {
      type: 'string',
      example: 'Hafez Almirza',
    },
    email: {
      type: 'string',
      example: 'hafezalmirza@gmail.com',
    },
    phone: {
      type: 'string',
      example: '19028738571',
    },
    address: {
      type: 'string',
      example: 'Jl. Sumatra Tengah No. 12, Kota Pekanbaru, Riau',
    }
  },
}

export const createCustomer = {
  tags: ['Customers'],
  summary: 'Create a customer data',
  description: 'Create a customer data',
  operationId: 'createCustomer',
  requestBody: {
    description: 'Create a customer data based on input',
    content: {
      'application/x-www-form-urlencoded': {
        schema: createCustomerBody,
      },
    },
    required: true,
  },

  responses: {
    '201': {
      description: 'Successfull operation',
      content: {
        'application/json': {
          schema: customerSuccessSchema
        },
      },
    },
  },
};

export const getAllCustomers = {
  tags: ['Customers'],
  summary: 'Fetch customers data',
  description: 'Fetch customers data',
  operationId: 'getAllCustomers',
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
                items: customerSchema
              }
            },
          }
        },
      },
    },
  },
};

export const getCustomer = {
  tags: ['Customers'],
  summary: 'Fetch a customer data',
  description: 'Fetch a customer data',
  operationId: 'getCustomer',
  responses: {
    '200': {
      description: 'Successfull operation',
      content: {
        'application/json': {
          schema: customerSuccessSchema
        },
      },
    },
  },
};

export const updateCustomer = {
  tags: ['Customers'],
  summary: 'Update a customer data',
  description: 'Update a customer data',
  operationId: 'updateCustomer',
  requestBody: {
    description: 'Update customer data based on input',
    content: {
      'application/x-www-form-urlencoded': {
        schema: createCustomerBody,
      },
    },
    required: true,
  },

  responses: {
    '200': {
      description: 'Successfull operation',
      content: {
        'application/json': {
          schema: customerSuccessSchema
        },
      },
    },
  },
};

export const deleteCustomer = {
  tags: ['Customers'],
  summary: 'Delete a customer data',
  description: 'Delete a customer data',
  operationId: 'deleteCustomer',
  responses: {
    '200': {
      description: 'Successfull operation',
      content: {
        'application/json': {
          schema: customerSuccessSchema
        },
      },
    },
  },
};