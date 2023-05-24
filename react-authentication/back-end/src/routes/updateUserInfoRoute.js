import jwt from "jsonwebtoken";
import mongoose, { ObjectId } from "mongoose";
import { initializeDbConnection } from "../db";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";

export const updateUserInfoRoute = {
    path: "/api/users/:userId",
    method: "put",
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const { userId } = req.params;

        const updates = (({
            favoriteFood,
            hairColor,
            bio
        }) => ({
            favoriteFood,
            hairColor,
            bio
        }))(req.body);

        if (!authorization) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: 'No authorization header sent' })
        }

        const token = authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "Unable to verify token." })

            const { id } = decoded;
            if (id !== userId) return res
                .status(StatusCodes.FORBIDDEN)
                .json({ message: "Not allowed to update that user's data." })

            await initializeDbConnection(process.env.MONGO_URI);
            var objId = new mongoose.Types.ObjectId(id);
            const result = await User.findOneAndUpdate(
                { _id: objId },
                { $set: { info: updates } },
                { returnOriginal: false }
            );

            const { email, isVerified, info } = result;
            jwt.sign(
                { id, email, isVerified, info },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_LIFETIME },
                (err, token) => {
                    if (err) return res.status(StatusCodes.OK).json({ err });
                    return res.status(StatusCodes.OK).json({ token });
                }
            );
        });


    }
}