import { Router } from "express";
import { getArtists, getArtistById, createArtist, updateArtist, deleteArtist } from "../Controllers/Artist.controller"
import { validateToken } from "../Controllers/Login.controller"

const router = Router();

router.get("/artist", getArtists);
router.get("/artist/:_id", getArtistById);
// router.post("/artist", validateToken, createArtist);
// router.put("/artist/:_id", validateToken, updateArtist);
// router.delete("/artist/:_id", validateToken, deleteArtist);
router.post("/artist", createArtist);
router.put("/artist/:_id", updateArtist);
router.delete("/artist/:_id", deleteArtist);

export default router