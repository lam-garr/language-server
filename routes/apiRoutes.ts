import express from "express";
import { POST_signup, GET_user, POST_login,
        GET_userData, PATCH_userData, verifyToken,
        GET_allLanguages } from "../controllers/apiController";

const router = express.Router();

router.post("/signup", POST_signup);

router.get("/get-user/:id", GET_user);

router.post("/login", POST_login);

router.get("/user-data", verifyToken, GET_userData)

router.patch("/update-user-data", verifyToken, PATCH_userData);

router.get("/get-languages", GET_allLanguages);

export default router;