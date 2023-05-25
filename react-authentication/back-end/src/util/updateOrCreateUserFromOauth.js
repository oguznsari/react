import { initializeDbConnection } from "../db";
import User from "../models/User";

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
    const {
        id: googleId,
        verified_email: isVerified,
        email
    } = oauthUserInfo;

    const user = await User.findOne({ email });
    if (user) {
        user.isVerified = isVerified;
        user.googleId = googleId;
        const result = await user.save();
        return user;
    } else {
        const result = await User.create({
            email,
            googleId,
            isVerified,
            info: {},
        });
        return result;
    }
}