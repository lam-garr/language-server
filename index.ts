import express, { Express } from "express";
import mongoose from "mongoose";
import apiRoutes from "./routes/apiRoutes";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const mongoDb = `${process.env.MONGODB}`;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.log.bind(console, "db connection error"));

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/api", apiRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})




