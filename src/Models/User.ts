import { Schema, model } from "mongoose";
import { IUser } from "../Interfaces/User"

const schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
});
  
export const User = model<IUser>("users", schema);