import { IArtist } from "./Artist";
import { ISong } from "./Song";

export interface IAlbum {
  _id: string;
  name: string;
  pricePhysical: number;
  priceDigital: number;
  stock: number;
  genres: string[];
  downloadType: "physical" | "digital";
  type: "single" | "album";
  coverImage: string;
  releaseDate: Date;
  artists: IArtist[];
  songs: ISong[];
}