import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
    languageName: {type: String},
    languageLessons: []
});

export default mongoose.model("language-languageLessons", LanguageSchema);