import express from "express";
import { POST_signup, GET_user, POST_login,
        GET_userData, PATCH_userData } from "../controllers/apiController";

const router = express.Router();

router.post("/signup", POST_signup);

router.get("/get-user/:id", GET_user);

router.post("/login", POST_login);

router.get("/user-data", GET_userData)

router.patch("/update-user-data", PATCH_userData);

export default router;