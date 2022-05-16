"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    pricePhysical: { type: Number },
    priceDigital: { type: Number },
    stock: { type: Number },
    genres: [{ type: String, required: true }],
    downloadType: { type: String, required: true },
    type: { type: String, required: true },
    coverImage: { type: String },
    releaseDate: { type: Date, required: true },
    artists: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "artists" }],
    songs: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "songs" }],
});
exports.Album = (0, mongoose_1.model)("albums", schema);
