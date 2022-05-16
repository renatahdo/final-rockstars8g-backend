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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAlbum = exports.updateAlbum = exports.createAlbum = exports.getAlbumById = exports.getAlbums = void 0;
const Album_1 = require("../Models/Album");
const getAlbums = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const albums = yield Album_1.Album.find().populate("artists").populate("songs");
        return res.json(albums);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getAlbums = getAlbums;
const getAlbumById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const album = yield Album_1.Album.findById(_id).populate("artists").populate("songs");
        return res.json(album);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getAlbumById = getAlbumById;
const createAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, pricePhysical, priceDigital, stock, genres, downloadType, type, coverImage, releaseDate, artists, songs } = req.body;
        const album = new Album_1.Album();
        album.name = name;
        album.pricePhysical = pricePhysical;
        album.priceDigital = priceDigital;
        album.stock = stock;
        album.genres = genres || [];
        album.downloadType = downloadType;
        album.type = type;
        album.coverImage = coverImage;
        album.releaseDate = releaseDate;
        album.artists = artists || [];
        album.songs = songs || [];
        yield album.save();
        return res.json(album);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createAlbum = createAlbum;
const updateAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    if (!_id)
        return res.status(400).json({ message: "_id from Album is required" });
    try {
        const album = yield Album_1.Album.findById(_id);
        if (!album)
            return res.status(404).json({ message: "Album doesn't exist" });
        const albumUpdated = yield album.update(req.body, { new: true });
        return res.json(albumUpdated);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateAlbum = updateAlbum;
const deleteAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        yield Album_1.Album.findByIdAndDelete(_id, { new: true });
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteAlbum = deleteAlbum;
