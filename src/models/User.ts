import mongoose, { Document, Schema, Types } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  url: Types.ObjectId;
}

interface IUrl extends Document {
  url: string;
  shortrl: string;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  url: [{ type: Schema.Types.ObjectId, ref: "Url" }],
});

const UrlSchema = new Schema<IUrl>({
  url: { type: String, required: true },
  shortrl: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
const UrlModel = mongoose.models.Url || mongoose.model<IUrl>("Url", UrlSchema);

export { UserModel, UrlModel };
