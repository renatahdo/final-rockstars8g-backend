"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Login_controller_1 = require("../Controllers/Login.controller");
const router = (0, express_1.Router)();
router.post("/login", Login_controller_1.loginUser);
exports.default = router;
