import { Router } from "express";
import { getAlbums, getAlbumById, createAlbum, updateAlbum, deleteAlbum } from "../Controllers/Album.controller"
import { validateToken } from "../Controllers/Login.controller"

const router = Router();

router.get("/album", getAlbums);
router.get("/album/:_id", getAlbumById);
// router.post("/album", validateToken, createAlbum);
// router.put("/album/:_id", validateToken, updateAlbum);
// router.delete("/album/:_id", validateToken, deleteAlbum);
router.post("/album", createAlbum);
router.put("/album/:_id", updateAlbum);
router.delete("/album/:_id", deleteAlbum);

export default router