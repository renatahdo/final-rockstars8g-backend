import { Schema, model } from "mongoose";
import { IAlbum } from "../Interfaces/Album"

const schema = new Schema<IAlbum>({
  name: { type: String, required: true },
  pricePhysical: { type: Number },
  priceDigital: { type: Number },
  stock: { type: Number },
  genres: [{ type: String, required: true }],
  downloadType: { type: String, required: true },
  type: { type: String, required: true },
  coverImage: { type: String },
  releaseDate: { type: Date, required: true },
  artists: [{ type: Schema.Types.ObjectId, ref: "artists" }],
  songs: [{ type: Schema.Types.ObjectId, ref: "songs" }],
});
  
export const Album = model<IAlbum>("albums", schema);