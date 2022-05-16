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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = require("mongoose");
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const Login_routes_1 = __importDefault(require("./Routes/Login.routes"));
const User_routes_1 = __importDefault(require("./Routes/User.routes"));
const Song_routes_1 = __importDefault(require("./Routes/Song.routes"));
const Album_routes_1 = __importDefault(require("./Routes/Album.routes"));
const Artist_routes_1 = __importDefault(require("./Routes/Artist.routes"));
dotenv_1.default.config();
const DB_NAME = process.env.DB_NAME || "";
const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_CLUSTER = process.env.DB_CLUSTER || "";
const SECRET_KEY_HASHED = process.env.SECRET_KEY_HASHED || "";
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({ origin: "*" }));
    app.use((0, morgan_1.default)('dev'));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.set("secretKey", SECRET_KEY_HASHED);
    app.use(Album_routes_1.default);
    app.use(Artist_routes_1.default);
    app.use(Song_routes_1.default);
    app.use(User_routes_1.default);
    app.use(Login_routes_1.default);
    app.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongoose_1.connect)(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`);
        console.log("🌷🌼🌻 -- Server running on port:", process.env.PORT, "-- 🌻🌼🌷");
    }));
});
main().catch((err) => {
    console.log(err);
});
