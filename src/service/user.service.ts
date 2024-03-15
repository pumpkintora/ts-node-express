import UserDocument from "../document/user.document";
import User from "../model/user.model";
import { Types } from "mongoose";

interface IUserService {
  createUser(user: UserDocument): Promise<UserDocument>;
  changePassword(userId: Types.ObjectId, password: string): Promise<any>;
}

class UserService implements IUserService {
  async createUser(user: UserDocument): Promise<UserDocument> {
      const newUser = await User.create(user)
      return newUser
  }
  async changePassword(userId: Types.ObjectId, password: string): Promise<any> {
      const existingUser = await User.findById({ _id: userId });
      Object.assign(existingUser, { ...existingUser, password })
      await existingUser.save();
      return existingUser;
  }
}

export default UserService;
