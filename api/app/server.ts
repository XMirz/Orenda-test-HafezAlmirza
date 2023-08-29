import "dotenv/config"
import express, { Express, Request, Response } from "express";
import { CustomerRouter } from "./routes/customer";


const app: Express = express()

app.use("/api/customers", CustomerRouter)

app.listen(process.env.PORT, () => {
  console.log(`Running express app in http://localhost:${process.env.PORT}`);
})