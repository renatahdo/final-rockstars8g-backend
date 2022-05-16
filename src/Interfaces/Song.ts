import { IArtist } from "./Artist";
import { IAlbum } from "./Album";

export interface ISong {
  _id: string;
  name: string;
  duration: string;
  file: string;
  preview: string;
  artists: IArtist[];
  albums: IAlbum[];
}