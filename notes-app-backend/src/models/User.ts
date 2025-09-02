import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  isVerified: boolean;
  otp?: string;
  otpExpiry?: Date;
  googleId?: string;  // 👈 add this
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // not required for Google users
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpiry: { type: Date },
  googleId: { type: String }, // 👈 new field
});

export default mongoose.model<IUser>("User", UserSchema);
