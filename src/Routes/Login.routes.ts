import { Router } from "express";
import { loginUser } from "../Controllers/Login.controller"

const router = Router();

router.post("/login", loginUser);

export default router