import { Request, Response } from "express";
import { Artist } from "../Models/Artist";

export const getArtists = async (req: Request, res: Response) => {
    try {
        const artists = await Artist.find().populate("albums");
        return res.json(artists);
    } catch (error) {
        if( error instanceof Error ) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const getArtistById = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params;
        const artist = await Artist.findById(_id).populate("albums");
        return res.json(artist);
    } catch (error) {
        if( error instanceof Error ) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const createArtist = async (req: Request, res: Response) => {
    try {
        const { stageName, type, nationality, coverImage, genres, albums } = req.body;
        const artist = new Artist();
        artist.stageName = stageName;
        artist.type = type;
        artist.nationality = nationality;
        artist.coverImage = coverImage;
        artist.genres = genres || [];
        artist.albums = albums || [];
        await artist.save();
        return res.json(artist);
    } catch (error) {
        if( error instanceof Error ) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const updateArtist = async (req: Request, res: Response) => {
    const { _id } = req.params
    if (!_id) return res.status(400).json({message: "_id from Artist is required"});
    try {
        const artist = await Artist.findById(_id);
        if(!artist) return res.status(404).json({message: "Artist doesn't exist"});
        const artistUpdated = await artist.update(req.body, { new: true});
        return res.json(artistUpdated);
    } catch (error) {
        if( error instanceof Error ) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const deleteArtist = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params
        await Artist.findByIdAndDelete(_id, { new: true })
        return res.sendStatus(204);
    } catch (error) {
        if( error instanceof Error ) {
            return res.status(500).json({ message: error.message });
        }
    }
};