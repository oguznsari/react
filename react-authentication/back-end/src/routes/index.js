import { forgotPasswordRoute } from './forgotPasswordRoute';
import { logInRoute } from './loginRoute';
import { signUpRoute } from './signUpRoute';
import { testEmailRoute } from './testEmailRoute';
import { testRoute } from './testRoute';
import { updateUserInfoRoute } from './updateUserInfoRoute';
import { verifyEmailRoute } from './verifyEmail';

export const routes = [
    testRoute,
    signUpRoute,
    logInRoute,
    updateUserInfoRoute,
    testEmailRoute,
    verifyEmailRoute,
    forgotPasswordRoute
];
