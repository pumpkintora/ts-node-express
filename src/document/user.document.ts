import { Model, Types } from "mongoose";

type UserDocument = {
  name: string;
  email: string;
  password: string;
  org: Types.ObjectId;
  isEmailTaken(email: string): boolean;
  isNameTaken(name: string): boolean;
  isPasswordMatch(password: string): boolean;
}

export default UserDocument;
