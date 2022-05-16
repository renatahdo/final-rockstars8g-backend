import { Schema, model } from "mongoose";
import { IArtist } from "../Interfaces/Artist"

const schema = new Schema<IArtist>({
  stageName: { type: String, required: true },
  type: { type: String, required: true },
  nationality: { type: String, required: true },
  coverImage: { type: String },
  genres: [{ type: String }],
  albums: [{ type: Schema.Types.ObjectId, ref: "albums" }],
});
  
export const Artist = model<IArtist>("artists", schema);