import { Request, Response } from "express";
import { Album } from "../Models/Album";

export const getAlbums = async (req: Request, res: Response) => {
    try {
        const albums = await Album.find().populate("artists").populate("songs");
        return res.json(albums);
    } catch (error) {
        if( error instanceof Error ) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const getAlbumById = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params;
        const album = await Album.findById(_id).populate("artists").populate("songs");
        return res.json(album);
    } catch (error) {
        if( error instanceof Error ) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const createAlbum = async (req: Request, res: Response) => {
    try {
        const { name, pricePhysical, priceDigital, stock, genres, downloadType, type, coverImage, releaseDate, artists, songs } = req.body;
        const album = new Album();
        album.name = name;
        album.pricePhysical = pricePhysical;
        album.priceDigital = priceDigital;
        album.stock = stock;
        album.genres = genres || [];
        album.downloadType = downloadType;
        album.type = type;
        album.coverImage = coverImage;
        album.releaseDate = releaseDate;
        album.artists = artists || [];
        album.songs = songs || [];
        await album.save();
        return res.json(album);
    } catch (error) {
        if( error instanceof Error ) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const updateAlbum = async (req: Request, res: Response) => {
    const { _id } = req.params
    if (!_id) return res.status(400).json({message: "_id from Album is required"});
    try {
        const album = await Album.findById(_id);
        if(!album) return res.status(404).json({message: "Album doesn't exist"});
        const albumUpdated = await album.update(req.body, { new: true});
        return res.json(albumUpdated);
    } catch (error) {
        if( error instanceof Error ) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const deleteAlbum = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params
        await Album.findByIdAndDelete(_id, { new: true })
        return res.sendStatus(204);
    } catch (error) {
        if( error instanceof Error ) {
            return res.status(500).json({ message: error.message });
        }
    }
};