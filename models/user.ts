import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userID: {},
    username: {},
    password: {},
    userData: {}
});

export default mongoose.model("language-user", UserSchema);