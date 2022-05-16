import { Router } from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../Controllers/User.controller"
import { validateToken } from "../Controllers/Login.controller"

const router = Router();

router.get("/user", validateToken, getUsers);
router.get("/user/:_id", validateToken, getUserById);
router.post("/user", createUser);
router.put("/user/:_id", updateUser);
router.delete("/user/:_id", deleteUser);

export default router