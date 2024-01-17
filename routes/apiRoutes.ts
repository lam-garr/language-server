import express from "express";
import { POST_signup, GET_user } from "../controllers/apiController";

const router = express.Router();

router.post("/signup", POST_signup);

router.get("/get-user/:id", GET_user);

export default router;