import mongoose, { Schema, Types, type Document, type Model } from "mongoose";



export interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
}

export interface ITask extends Document {
    title: string;
    description: string;
    completed: boolean;
    user: IUser["_id"];

}

const TaskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export const Task: Model<ITask> = mongoose.model<ITask>("Task", TaskSchema);