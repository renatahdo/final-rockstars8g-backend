"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    duration: { type: String, required: true },
    file: { type: String, required: true },
    preview: { type: String, required: true },
    artists: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "artists" }],
    albums: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "albums" }],
});
exports.Song = (0, mongoose_1.model)("songs", schema);
