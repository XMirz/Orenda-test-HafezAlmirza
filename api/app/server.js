require("dotenv/config")
const express = require("express");
const { CustomerRouter } = require("./routes/customer");


const app = express()

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
})

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/customers", CustomerRouter)

app.listen(process.env.PORT, () => {
  console.log(`Running express app in http://localhost:${process.env.PORT}`);
})