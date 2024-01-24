import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
    languageId: {},
    languageName: {type: String},
    languageLessons: []
});

export default mongoose.model("language-language", LanguageSchema);