import express from "express"
import cors from "cors"
import { connect } from 'mongoose';
import morgan from "morgan";
import dotenv from 'dotenv';
import loginRoutes from "./Routes/Login.routes"
import userRoutes from "./Routes/User.routes"
import songRoutes from "./Routes/Song.routes"
import albumRoutes from "./Routes/Album.routes"
import artistRoutes from "./Routes/Artist.routes"
dotenv.config();

const DB_NAME = process.env.DB_NAME || "";
const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_CLUSTER = process.env.DB_CLUSTER || "";
const SECRET_KEY_HASHED = process.env.SECRET_KEY_HASHED || "";

const main = async () => {
    const app = express()
    app.use(cors())
    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.set("secretKey", SECRET_KEY_HASHED);
    app.use(albumRoutes);
    app.use(artistRoutes);
    app.use(songRoutes);
    app.use(userRoutes);
    app.use(loginRoutes);

    app.listen(process.env.PORT, async () => {
        await connect(
            `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`
        );
        console.log("🌷🌼🌻 -- Server running on port:", process.env.PORT, "-- 🌻🌼🌷");
    });
};

main().catch((err) => {
    console.log(err);
})