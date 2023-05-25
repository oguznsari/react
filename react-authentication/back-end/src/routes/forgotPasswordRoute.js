import { v4 as uuid } from "uuid";
import { sendEmail } from "../util/sendEmail";
import { initializeDbConnection } from "../db";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";

export const forgotPasswordRoute = {
    path: "/api/forgot-password/:email",
    method: "put",
    handler: async (req, res) => {
        const { email } = req.params;

        await initializeDbConnection(process.env.MONGO_URI);
        const passowrdResetCode = uuid();

        const user = await User.findOne({ email });

        let result = false;
        if (user) {
            user.passwordResetCode = passowrdResetCode;
            result = await user.save();
        }

        if (result) {
            try {
                await sendEmail({
                    to: email,
                    from: 'emailsend459@gmail.com',
                    subject: 'Password Reset',
                    text: `
                        To reset your password, click this link:
                        http://localhost:3000/reset-password/${passowrdResetCode}
                    `
                })
            } catch (error) {
                console.log({ error });
                res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            }
        }

        res.sendStatus(StatusCodes.OK);
    }
}