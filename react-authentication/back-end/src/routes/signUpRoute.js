import User from '../models/User';
import { initializeDbConnection } from '../db';
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { sendEmail } from '../util/sendEmail';

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

        const passwordHash = await bcrypt.hash(password, 10);
        const verificationString = uuid();

        const startingInfo = {
            hairColor: "",
            favoriteFood: "",
            bio: ""
        }

        const result = await User.create({
            email,
            passwordHash,
            info: startingInfo,
            isVerified: false,
            verificationString
        });

        const { insertedId } = result;

        try {
            await sendEmail({
                to: email,
                from: 'emailsend459@gmail.com',
                subject: 'Please verify your email',
                text: `
                    Thanks for signing up! To verify your email, click here:
                    http://localhost:3000/verify-email/${verificationString}
                `
            });
        } catch (error) {
            console.log({ error });
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }

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