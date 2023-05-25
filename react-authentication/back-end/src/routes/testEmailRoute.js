import { sendEmail } from "../util/sendEmail";
import { StatusCodes } from "http-status-codes";

export const testEmailRoute = {
    path: '/api/test-email',
    method: 'post',
    handler: async (req, res) => {
        try {
            await sendEmail({
                to: 'oguzn.sari@gmail.com',
                from: 'emailsend459@gmail.com',
                subject: 'Does this work?',
                text: "If you're reading this... yes!"
            });
            res.status(StatusCodes.OK).json({ msg: 'Success...' })
        } catch (error) {
            console.log({ error });
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Failed...' })
        }
    }
}