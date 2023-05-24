import User from '../models/User';
import { initializeDbConnection } from '../db';
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;

        await initializeDbConnection(process.env.MONGO_URI);
        const user = await User.findOne({ email });

        if (user) {
            res.status(StatusCodes.CONFLICT);
        }

        console.log({ password })
        const passwordHash = await bcrypt.hash(password, 10);

        const startingInfo = {
            hairColor: "",
            favoriteFood: "",
            bio: ""
        }

        const result = await User.create({
            email,
            passwordHash,
            info: startingInfo,
            isVerified: false
        });

        const { insertedId } = result;

        jwt.sign(
            {
                id: insertedId,
                email,
                info: startingInfo,
                isVerified: false,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_LIFETIME
            },
            (err, token) => {
                if (err) {
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
                }

                res.status(StatusCodes.OK).json({ token });
            }
        )
    }
};