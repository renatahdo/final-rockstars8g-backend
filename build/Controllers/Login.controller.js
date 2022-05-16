"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserType = exports.validateToken = exports.loginUser = void 0;
const User_1 = require("../Models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY_HASHED = process.env.SECRET_KEY_HASHED || "";
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!password)
        return res.status(400).json({ message: "Password is required" });
    if (!email)
        return res.status(400).json({ message: "Email is required" });
    let user = yield User_1.User.findOne({ email });
    if (!user)
        return res.status(404).json({ message: "User not found" });
    if (user.password !== password)
        return res.status(400).json({ message: "Incorrect password" });
    ;
    const token = jsonwebtoken_1.default.sign({ _id: user._id, email, rol: user.type }, SECRET_KEY_HASHED, { expiresIn: "3h" });
    const userAuth = {
        email: user.email,
        token
    };
    return res.json(userAuth);
});
exports.loginUser = loginUser;
const validateToken = (req, res, next) => (0, exports.validateUserType)(req, res, next, "admin");
exports.validateToken = validateToken;
const validateUserType = (req, res, next, userType) => {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token)
        return res.status(401).json({ message: "You are unauthorized - No token" });
    jsonwebtoken_1.default.verify(token, SECRET_KEY_HASHED, (error, decode) => {
        if (error)
            return res.status(500).json({ message: error.message });
        if (decode && typeof decode !== "string") {
            if (userType && userType !== decode.rol) {
                res.status(403).json({ message: "You are not admin - Forbidden" });
            }
            else {
                req.body.decode = decode;
                next();
            }
        }
    });
};
exports.validateUserType = validateUserType;
