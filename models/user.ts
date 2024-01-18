import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId: {},
    username: {type: String, required: true},
    password: {},
    userData: {}
});

export default mongoose.model("language-user", UserSchema);