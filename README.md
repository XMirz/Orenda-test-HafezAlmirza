## SimpCommerce

Simple app to complete recruitment process in Orenda Digital

### Running Projects

#### Backend

- Create database named `orenda` locally, configure DATABASE_URL in .env if needed
- Go to api dir<br>
  `cd api`
- Install dependency<br>
  `npm install`
- Configure the database<br>
  `npx prisma db push`
- Run development server<br>
  `npm run dev`
- Open `http://localhost:3000/api-docs` to view API Documentations

#### Frontend

- Go to api dir<br>
  `cd client`
- Install dependency<br>
  `npm install`
- Run app<br>
  `npm start`
- configure PORT in start script of package.json if needed

### Requirement

1. Your code must be shared on GitHub that is publicly accessible,
   with the repository format name: `Orenda-test-<YOUR_NAME>`
2. Your repository should create 3 directories,
   a. logical, for answer question A below
   b. api, for the backend project code from question B below
   c. client, for frontend project code from question B below
3. Your code should contain a README.md that describe your project
   and includes the instruction to run, we need to be able to run
   and test your solution
4. Must use NodeJS with ExpressJS for the backend with REST API
5. Must use ReactJS with a UI library like MaterialUI or another
   for the frontend
6. Must use a relational database like Postgres or MySQL
7. Must use an ORM (Sequelize or Prisma)
8. Please use async-await Promise in your code
9. Better recommended if use Typescript
10. Better recommended if use JWT
11. Better recommended if do API documentation like Swagger or
    another else

#### 1. Logical

```
function isPalindrome(num) {
  const numStr = num.toString();
  const reversedStr = numStr.split('').reverse().join('');
  return numStr === reversedStr;
}
```

#### 2. Backend

1. Create endpoint for handling CRUD for table
   customer with fields {name, phone, email,
   address} #Done
2. Create endpoint for handling CRUD for table
   product with fields {name, unit, price} #Done
3. Create endpoint for handling create customer
   orders with multiple products and can input
   lumpsum discount for the order #Done
4. Create endpoint to get detail of an existing
   order including customer, products, and the total
   information #Done

#### 3. FrontEnd
