import User from "../models/User.js";
import { compare_passwords } from "../utils/compare_passwords.js";
import { createError } from "../utils/error.js";
import { hash_password } from "../utils/hash_password.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const register = async (req, res, next) => {
    try {
        const hashed_password = await hash_password(req.body.password);
        const new_user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashed_password
        });
        await new_user.save();
        res.status(200).send("User created successfully!")
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return next(createError(404, "User not found!"));
        }

        const compare_password = await compare_passwords(req.body.password, user.password);
        if (!compare_password) {
            return next(createError("400", "Invalid password"));
        }
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)
        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, { httpOnly: true }).status(200).json({ ...otherDetails });
    } catch (error) {
        next(error);
    }
}