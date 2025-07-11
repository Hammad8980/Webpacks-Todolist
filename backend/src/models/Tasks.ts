import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: "p1" | "p2" | "p3";
}

const taskSchema: Schema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    priority: {
      type: String,
      enum: ["p1", "p2", "p3"],
      default: "p1",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITask>("Task", taskSchema);
