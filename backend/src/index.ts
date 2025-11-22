// Loads the env variables at the beginning
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express, { type Request, type Response } from "express";

// Importing the routers
import customerRouter from "./routes/customer.router";
import driverRouter from "./routes/driver.router";
import managementRouter from "./routes/management.router";


const PORT = process.env.PORT || 8080;

const app = express();

// Health check route...
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Server is healthy!!!",
  });
});

// Setting up the middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting up the routers
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/driver", driverRouter);
app.use("/api/v1/management", managementRouter);

app.listen(PORT, () => {
  console.log(`Sever is listenting on port ${PORT}`);
});
