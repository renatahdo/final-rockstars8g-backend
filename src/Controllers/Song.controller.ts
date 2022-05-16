import { Request, Response } from "express";
import { Song } from "../Models/Song";

export const getSongs = async (req: Request, res: Response) => {
    try {
        const songs = await Song.find().populate("artists").populate("albums");
        return res.json(songs);
    } catch (error) {
        if( error instanceof Error ) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const getSongById = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params
        const song = await Song.findById(_id).populate("artists").populate("albums");
        return res.json(song);
    } catch (error) {
        if( error instanceof Error ) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const createSong = async (req: Request, res: Response) => {
    try {
        const { name, duration, file, preview, price, genres, downloadType, type, releaseDate, artists, albums } = req.body;
        const song = new Song();
        song.name = name;
        song.duration = duration;
        song.file = file;
        song.preview = preview;
        song.artists = artists || [];
        song.albums = albums || [];
        await song.save();
        return res.json(song);
    } catch (error) {
        if( error instanceof Error ) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const updateSong = async (req: Request, res: Response) => {
    const { _id } = req.params
    if (!_id) return res.status(400).json({message: "_id from Song is required"});
    try {
        const song = await Song.findById(_id);
        if(!song) return res.status(404).json({message: "Song doesn't exist"});
        const songUpdated = await song.update(req.body, { new: true});
        return res.json(songUpdated);
    } catch (error) {
        if( error instanceof Error ) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const deleteSong = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params
        await Song.findByIdAndDelete(_id, { new: true })
        return res.sendStatus(204);
    } catch (error) {
        if( error instanceof Error ) {
            return res.status(500).json({ message: error.message });
        }
    }
};