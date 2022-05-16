"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artist = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    stageName: { type: String, required: true },
    type: { type: String, required: true },
    nationality: { type: String, required: true },
    coverImage: { type: String },
    genres: [{ type: String }],
    albums: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "albums" }],
});
exports.Artist = (0, mongoose_1.model)("artists", schema);
