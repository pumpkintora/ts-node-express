import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import UserDocument from "../document/user.document";

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // And `Schema.Types.ObjectId` in the schema definition.
  org: { type: Schema.Types.ObjectId, ref: "Organization" },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.method(
  "isPasswordMatch",
  function isPasswordMatch(password: string) {
    const user = this;
    return bcrypt.compare(password, user.password);
  }
);

userSchema.statics.isEmailTaken = async function isEmailTaken(email: string) {
  const user = await this.findOne({ email });
  return !!user;
};

userSchema.statics.isNameTaken = async function isNameTaken(name: string) {
  const user = await this.findOne({ name });
  return !!user;
};

const User = model("User", userSchema);

export default User;
