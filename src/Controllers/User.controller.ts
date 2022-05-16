import { Request, Response } from "express";
import { User } from "../Models/User";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        if( error instanceof Error ) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params
        const user = await User.findById(_id);
        return res.json(user);
    } catch (error) {
        if( error instanceof Error ) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, type } = req.body;
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password;
        user.type = type;
        await user.save()
        return res.json(user);
    } catch (error) {
        if( error instanceof Error ) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { _id } = req.params
    if (!_id) return res.status(400).json({message: "_id from Album is required"});
    try {
        const user = await User.findById(_id);
        if(!user) return res.status(404).json({message: "Album doesn't exist"});
        const userUpdated = await user.update(req.body, { new: true});
        return res.json(userUpdated);
    } catch (error) {
        if( error instanceof Error ) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params
        await User.findByIdAndDelete(_id, { new: true })
        return res.sendStatus(204);
    } catch (error) {
        if( error instanceof Error ) {
            return res.status(500).json({ message: error.message });
        }
    }
};