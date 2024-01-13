import express, { Express } from "express";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})




