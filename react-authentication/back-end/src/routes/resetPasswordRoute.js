import bcrypt from "bcrypt";
import { initializeDbConnection } from '../db';
import User from "../models/User";
import { StatusCodes } from "http-status-codes";

export const resetPasswordRoute = {
    path: "/api/users/:passwordResetCode/reset-password",
    method: "put",
    handler: async (req, res) => {
        const { passwordResetCode } = req.params;
        const { newPassword } = req.body;

        const newSalt = uuid();
        const pepper = process.env.PEPPER_STRING;

        await initializeDbConnection(process.env.MONGO_URI);
        const newPasswordHash = await bcrypt.hash(
            newSalt + newPassword + pepper,
            10);

        const user = await User.findOne({ passwordResetCode });
        user.passwordHash = newPasswordHash;
        user.salt = newSalt;

        let result = await user.save();
        if (!result) {
            res.sendStatus(StatusCodes.NOT_FOUND);
        }

        res.sendStatus(StatusCodes.OK);
    }
}