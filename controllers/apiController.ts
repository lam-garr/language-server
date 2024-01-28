import express, { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from "uuid";
import { validationResult } from 'express-validator';
import User from "../models/user";
import Language from "../models/language";

export async function POST_signup(req: Request, res: Response, next: NextFunction) {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({message: "Signup error"});
    }

    const hashedPw = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        userId: uuid(),
        username: req.body.username,
        password: hashedPw,
        userData: ""
    });

    try {
        const newUser = await user.save();
        res.status(201).json({message: "success"});
    } catch(err) {
        res.status(400);
    }
}

export async function GET_user(req: Request, res: Response) {
    const user = await User.findOne({userId: req.params.id});

    if(user) {
        res.json(user);
    } else {
        res.status(404).send("err");
    }
}

export async function POST_login(req: Request, res: Response){

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({message:'Login Error..'});
    }

    const user = await User.findOne({username: req.body.username});
    console.log(user)
    if(user &&(await bcrypt.compare(req.body.password, user.password))){
        const id = user.userId;
        const token = jwt.sign({id}, `${process.env.SECRET}`, {expiresIn: '24h'});
        res.json({accessToken: token});
    }else{
        res.status(400).json({message:'Login Error'});
    }
}

export async function GET_userData(req: Request, res: Response) {
    const user = await User.findOne({userId: req.id.id});

    console.log(user);

    if(user) {
        res.json(user.userData);
    } else {
        res.status(404).json({message: "err"});
    }
}

export async function PATCH_userData(req: Request, res: Response) {
    try {
        const user = await User.findOneAndUpdate({userId: req.id.id}, req.body, {new: true});
        res.json({message: "Update success"});
    } catch (error) {
        res.status(500).json({error: "Update error"});
    }
}

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];

    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, `${process.env.SECRET}`, (err, user) => {
            if(err) return res.status(403).json(err);

            req.id = user;
            
            next();
        })
    } else {
        res.status(400);
    }
}

export async function GET_allLanguages(req: Request, res: Response) {
    const language = await Language.findOne({languageId: req.id});

    if(language) {
        res.json(language.languageLessons);
    } else {
        res.status(404).json({message: "err fetching lessons"});
    }
}

export async function POST_getLanguageLessons(req: Request, res: Response) {
    const language = await Language.findOne({languageName: req.body.lessonName});
    
    if(language) {
        const languageLesson = language.languageLessons.find(obj => obj.id === req.body.lessonId);
        res.json({languageLesson: languageLesson});
    } else {
        res.status(404).json({message: "error fetching lessons"});
    }
}