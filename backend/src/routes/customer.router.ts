import { Router, Request, Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "";

const router = Router();


export default router;
