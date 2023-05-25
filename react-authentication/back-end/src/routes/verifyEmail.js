import jwt from "jsonwebtoken";
import { initializeDbConnection } from "../db";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";

export const verifyEmailRoute = {
    path: '/api/verify-email',
    method: 'put',
    handler: async (req, res) => {
        const { verificationString } = req.body;
        await initializeDbConnection(process.env.MONGO_URI);

        const user = await User.findOne({ verificationString });
        if (!user) return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ msg: 'The email verification code is incorrect' });

        user.isVerified = true;
        await user.save();
        const { _id: id, email, info } = user;

        jwt.sign(
            { id, email, isVerified: true, info },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_LIFETIME },
            (err, token) => {
                if (err) return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
                res.status(StatusCodes.OK).json({ token })
            }
        );
    }
}