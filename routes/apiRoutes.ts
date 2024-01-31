import express from "express";
import { POST_signup, GET_user, POST_login,
        GET_userData, PATCH_userData, verifyToken,
        GET_allLanguages, POST_getLanguageLessons, GET_validate } from "../controllers/apiController";

const router = express.Router();

router.post("/signup", POST_signup);

router.get("/get-user/:id", GET_user);

router.post("/login", POST_login);

router.get("/user-data", verifyToken, GET_userData)

router.patch("/update-user-data", verifyToken, PATCH_userData);

router.get("/get-languages", GET_allLanguages);

router.post("/get-lessons", POST_getLanguageLessons);

router.get("/validate", GET_validate);

export default router;