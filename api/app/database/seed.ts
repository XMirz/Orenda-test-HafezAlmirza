import { Customer, Product } from "./prisma";

async function main() {
  const customers = [];
  for (let i = 1; i <= 25; i++) {
    const customer = {
      name: `User ${i}`,
      email: `user${i}@gmail.com`,
      phone: `${i}823198${i}`,
      address: `address of ${i}`,
    }
    customers.push(customer)
  }

  await Customer.deleteMany()
  await Customer.createMany({
    data: customers
  })

  // Product Seed
  const products = [];
  for (let i = 1; i <= 25; i++) {
    const product = {
      name: `Product ${i}`,
      unit: i,
      price: parseInt(`${i}00000`),
    }
    products.push(product)
  }

  await Product.deleteMany()
  await Product.createMany({
    data: products
  })
}

main()