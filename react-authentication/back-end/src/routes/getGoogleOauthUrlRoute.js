import { StatusCodes } from "http-status-codes";
import { getGoogleOauthUrl } from "../util/getGoogleOauthUrj";

export const getGoogleOauthUrlRoute = {
    path: '/auth/google/url',
    method: 'get',
    handler: (req, res) => {
        const url = getGoogleOauthUrl();
        res.status(StatusCodes.OK).json({ url });
    }
}