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

const main = async () => {
    const app = express()
    var PORT = process.env.PORT || 10033
    app.use(cors({origin: "*"}))
    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    //SECRET_KEY="MiClaveSecreta"
    app.set("secretKey", "16eb7f187e359350bc5bd3fc9742ff0b81abad7dffb927fcb2916cd5d0ee1b8285f60c9ea41332cf890a33e07baab1ed6500e66879c2814a58f9ad0bb9782dee");
    app.use(albumRoutes);
    app.use(artistRoutes);
    app.use(songRoutes);
    app.use(userRoutes);
    app.use(loginRoutes);

    app.listen(process.env.PORT, async () => {
        await connect(
            `mongodb+srv://RenataHdo:Renata.2198@rockstars.v0o1d.mongodb.net/music-store?retryWrites=true&w=majority`
        );
        console.log("🌷🌼🌻 -- Server running on port:", process.env.PORT, "-- 🌻🌼🌷");
    });
};

main().catch((err) => {
    console.log(err);
})