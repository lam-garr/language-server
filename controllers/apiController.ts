import express, { Request, Response, NextFunction } from "express";
import User from "../models/user";

export async function POST_signup(req: Request, res: Response, next: NextFunction) {
    const user = new User({
        userID: 2,
        username: "user1",
        password: "password",
        userData: "data"
    });

    try {
        const newUser = await user.save();
        res.status(201).json({message: "success"});
    } catch(err) {
        res.status(400);
    }
}

export async function GET_user(req: Request, res: Response) {
    const user = await User.findOne({userID: req.params.id});

    if(user) {
        res.json(user);
    } else {
        res.status(404).send("err");
    }
}