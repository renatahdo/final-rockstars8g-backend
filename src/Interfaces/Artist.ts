import { IAlbum } from "./Album";

export interface IArtist {
    _id: string;
    stageName: string;
    type: "group" | "singer";
    nationality: string;
    coverImage: string;
    genres: string[];
    albums: IAlbum[];
}