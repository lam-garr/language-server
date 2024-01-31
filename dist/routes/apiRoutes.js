"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiController_1 = require("../controllers/apiController");
const router = express_1.default.Router();
router.post("/signup", apiController_1.POST_signup);
router.get("/get-user/:id", apiController_1.GET_user);
router.post("/login", apiController_1.POST_login);
router.get("/user-data", apiController_1.verifyToken, apiController_1.GET_userData);
router.patch("/update-user-data", apiController_1.verifyToken, apiController_1.PATCH_userData);
router.get("/get-languages", apiController_1.GET_allLanguages);
router.post("/get-lessons", apiController_1.POST_getLanguageLessons);
router.get("/validate", apiController_1.GET_validate);
exports.default = router;
