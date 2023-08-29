import { Router, Request, Response } from "express";

const router: Router = Router()

router.get("/", (req: Request, res: Response) => {
  res.send(200)
})
router.post("/", (req: Request, res: Response) => {
  res.send(200)
})


export const CustomerRouter = router