import { addToCart, getCustomerCart } from "./cart";
import { createCustomer, createCustomerBody, deleteCustomer, getAllCustomers, getCustomer, updateCustomer } from "./customers";
import { completeOrder, getCustomerOrders } from "./order";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "./product";

export const apiDocs = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Express API for Orenda Test",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      contact: {
        name: "Hafez Almirza",
        url: "https://xmirz.vercel.app",
        email: "hafezalmirza@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/",
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Customers',
      },
      {
        name: 'Products',
      },
      {
        name: 'Cart',
      },
      {
        name: 'Order',
      },
    ],
    paths: {
      '/customers': {
        post: createCustomer,
        get: getAllCustomers
      },
      '/customers/{id}': {
        get: getCustomer,
        patch: updateCustomer,
        delete: deleteCustomer
      },
      '/products': {
        post: createProduct,
        get: getAllProducts,
      },
      '/products/{id}': {
        get: getProduct,
        patch: updateProduct,
        delete: deleteProduct
      },
      '/cart/{customerId}': {
        get: getCustomerCart
      },
      '/cart': {
        post: addToCart
      },
      '/order/{customerId}': {
        get: getCustomerOrders
      },
      '/order': {
        post: completeOrder
      }
    }
  },
  // components: {
  //   schemas: {
  //     createCustomerBody,
  //   },
  // },
  apis: ["./routes/*.ts"],
}