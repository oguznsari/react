import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { initializeDbConnection } from "../db";
import { StatusCodes } from "http-status-codes";

export const updateUserInfoRoute = {
    path: "/api/users/:userId",
    method: "put",
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const userId = req.params;

        const updates = ({
            favoriteFood,
            hairColor,
            bio
        }) => ({
            favoriteFood,
            hairColor,
            bio
        })(req.body);

        if (!authorization) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: 'No authorization header sent' })
        }

        const token = authorization.split(" ")[1];
    }
}