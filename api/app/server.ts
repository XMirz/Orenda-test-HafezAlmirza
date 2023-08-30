import("dotenv/config")
import express, { NextFunction, Request, Response } from "express";
import { CustomerRouter } from "./routes/customer.route";
import { ProductRoute } from "./routes/product.route";
import { handleError, handleUnknownRoute } from "./middlewares/handle-error";
import { CartRoute } from "./routes/cart.route";


const app = express()

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
})

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/customers", CustomerRouter)
app.use("/api/products", ProductRoute)
app.use("/api/cart", CartRoute)

// handle Error
app.all("*", handleUnknownRoute)
app.use(handleError)

app.listen(process.env.PORT, () => {
  console.log(`Running on http://localhost:${process.env.PORT}`);
})