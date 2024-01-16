import express from "express";
import { POST_signup } from "../controllers/apiController";

const router = express.Router();

router.post("/signup", POST_signup);

export default router;