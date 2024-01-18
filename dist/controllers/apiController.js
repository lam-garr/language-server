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
exports.POST_login = exports.GET_user = exports.POST_signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../models/user"));
function POST_signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Signup error" });
        }
        const hashedPw = yield bcryptjs_1.default.hash(req.body.password, 10);
        const user = new user_1.default({
            userId: (0, uuid_1.v4)(),
            username: req.body.username,
            password: hashedPw,
            userData: ""
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
        const user = yield user_1.default.findOne({ userId: req.params.id });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).send("err");
        }
    });
}
exports.GET_user = GET_user;
function POST_login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Login Error' });
        }
        const user = yield user_1.default.findOne({ username: req.body.username });
        console.log(user);
        if (user && (yield bcryptjs_1.default.compare(req.body.password, user.password))) {
            const id = user.userId;
            const token = jsonwebtoken_1.default.sign({ id }, `${process.env.SECRET}`, { expiresIn: '24h' });
            res.json({ accessToken: token });
        }
        else {
            res.status(400).json({ message: 'Login Error' });
        }
    });
}
exports.POST_login = POST_login;
