import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { initializeDbConnection } from "../db";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";


export const logInRoute = {
    path: "/api/login",
    method: "post",
    handler: async (req, res) => {
        const { email, password } = req.body;
        await initializeDbConnection(process.env.MONGO_URI);

        const user = await User.findOne({ email });
        if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });

        const { _id: id, isVerified, passwordHash, salt, info } = user;
        const pepper = process.env.PEPPER_STRING;
        const isCorrect = await bcrypt.compare(
            salt + password + pepper,
            passwordHash);

        if (isCorrect) {
            jwt.sign(
                { id, isVerified, email, info },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_LIFETIME },
                (err, token) => {
                    if (err) {
                        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
                    }
                    res.status(StatusCodes.OK).json({ token })
                }
            );
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
        }
    }
}