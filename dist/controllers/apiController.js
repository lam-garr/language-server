"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_user = exports.POST_signup = void 0;
const user_1 = __importDefault(require("../models/user"));
function POST_signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new user_1.default({
            userID: 2,
            username: "user1",
            password: "password",
            userData: "data"
        });
        try {
            const newUser = yield user.save();
            res.status(201).json({ message: "success" });
        }
        catch (err) {
            res.status(400);
        }
    });
}
exports.POST_signup = POST_signup;
function GET_user(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ userID: req.params.id });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).send("err");
        }
    });
}
exports.GET_user = GET_user;
