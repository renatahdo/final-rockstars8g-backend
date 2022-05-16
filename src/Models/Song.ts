import { Schema, model } from "mongoose";
import { ISong } from "../Interfaces/Song"

const schema = new Schema<ISong>({
    name: { type: String, required: true },
    duration: { type: String, required: true },
    file: { type: String, required: true },
    preview: { type: String, required: true },
    artists: [{ type: Schema.Types.ObjectId, ref: "artists" }],
    albums: [{ type: Schema.Types.ObjectId, ref: "albums" }],
});
  
export const Song = model<ISong>("songs", schema);