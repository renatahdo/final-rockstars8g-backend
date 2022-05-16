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
exports.deleteArtist = exports.updateArtist = exports.createArtist = exports.getArtistById = exports.getArtists = void 0;
const Artist_1 = require("../Models/Artist");
const getArtists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const artists = yield Artist_1.Artist.find().populate("albums");
        return res.json(artists);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getArtists = getArtists;
const getArtistById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const artist = yield Artist_1.Artist.findById(_id).populate("albums");
        return res.json(artist);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getArtistById = getArtistById;
const createArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stageName, type, nationality, coverImage, genres, albums } = req.body;
        const artist = new Artist_1.Artist();
        artist.stageName = stageName;
        artist.type = type;
        artist.nationality = nationality;
        artist.coverImage = coverImage;
        artist.genres = genres || [];
        artist.albums = albums || [];
        yield artist.save();
        return res.json(artist);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createArtist = createArtist;
const updateArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    if (!_id)
        return res.status(400).json({ message: "_id from Artist is required" });
    try {
        const artist = yield Artist_1.Artist.findById(_id);
        if (!artist)
            return res.status(404).json({ message: "Artist doesn't exist" });
        const artistUpdated = yield artist.update(req.body, { new: true });
        return res.json(artistUpdated);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateArtist = updateArtist;
const deleteArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        yield Artist_1.Artist.findByIdAndDelete(_id, { new: true });
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteArtist = deleteArtist;
