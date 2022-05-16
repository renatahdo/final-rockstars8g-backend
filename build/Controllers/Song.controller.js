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
exports.deleteSong = exports.updateSong = exports.createSong = exports.getSongById = exports.getSongs = void 0;
const Song_1 = require("../Models/Song");
const getSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield Song_1.Song.find().populate("artists").populate("albums");
        return res.json(songs);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getSongs = getSongs;
const getSongById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const song = yield Song_1.Song.findById(_id).populate("artists").populate("albums");
        return res.json(song);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getSongById = getSongById;
const createSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, duration, file, preview, price, genres, downloadType, type, releaseDate, artists, albums } = req.body;
        const song = new Song_1.Song();
        song.name = name;
        song.duration = duration;
        song.file = file;
        song.preview = preview;
        song.artists = artists || [];
        song.albums = albums || [];
        yield song.save();
        return res.json(song);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createSong = createSong;
const updateSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    if (!_id)
        return res.status(400).json({ message: "_id from Song is required" });
    try {
        const song = yield Song_1.Song.findById(_id);
        if (!song)
            return res.status(404).json({ message: "Song doesn't exist" });
        const songUpdated = yield song.update(req.body, { new: true });
        return res.json(songUpdated);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateSong = updateSong;
const deleteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        yield Song_1.Song.findByIdAndDelete(_id, { new: true });
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteSong = deleteSong;
