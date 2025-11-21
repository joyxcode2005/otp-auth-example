import express, { type Request, type Response } from "express";

const PORT = process.env.PORT || 8080;

const app = express();

// Health check route...
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Server is healthy!!!"
  })
})


app.listen(PORT , () => {
  console.log(`Sever is listenting on port ${PORT}`)
})