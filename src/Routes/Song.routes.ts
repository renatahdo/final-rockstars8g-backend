import { Router } from "express";
import { getSongs, getSongById, createSong, updateSong, deleteSong } from "../Controllers/Song.controller"
import { validateToken } from "../Controllers/Login.controller"

const router = Router();

router.get("/song", getSongs);
router.get("/song/:_id", getSongById);
// router.post("/song", validateToken, createSong);
// router.put("/song/:_id", validateToken, updateSong);
// router.delete("/song/:_id", validateToken, deleteSong);
router.post("/song", createSong);
router.put("/song/:_id", updateSong);
router.delete("/song/:_id", deleteSong);

export default router