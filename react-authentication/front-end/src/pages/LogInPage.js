import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useToken } from "../auth/UseToken";
import axios from "axios";
import { useQueryParams } from "../util/useQueryParams";

export const LogInPage = () => {
    const [, setToken] = useToken();
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [googleOauthUrl, setGoogleOauthUrl] = useState('');
    const { token: oauthToken } = useQueryParams();

    const history = useHistory();

    useEffect(() => {
        if (oauthToken) {
            setToken(oauthToken);
            history.push('/');
        }
    }, [oauthToken, setToken, history]);

    useEffect(() => {
        const loadOauthUrl = async () => {
            try {
                const response = await axios.get('/auth/google/url');
                const { url } = response.data;
                setGoogleOauthUrl(url);
            } catch (error) {
                console.log({ error });
            }
        }

        loadOauthUrl();
    }, [])

    const onLogInClicked = async () => {
        try {
            const response = await axios.post('/api/login', {
                email: emailValue,
                password: passwordValue
            });

            const { token } = response.data;
            setToken(token);
            history.push('/');
        } catch (error) {
            setErrorMessage(error.message);
        }


    }

    return (
        <div className="content-container">
            {
                errorMessage &&
                <div className="fail">{errorMessage}</div>
            }
            <h1>Log In</h1>
            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="someone@gmail.com" />
            <input
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                type="password"
                placeholder="password" />
            <hr />
            <button
                disabled={!emailValue || !passwordValue}
                onClick={onLogInClicked}>
                Log In</button>
            <button
                onClick={() => history.push('/forgot-password')}>
                Forgot your password?</button>
            <button
                onClick={() => history.push('/signup')}>
                Don't have an account? Sign UP</button>
            <button
                disabled={!googleOauthUrl}
                onClick={() => window.location.href = googleOauthUrl}
            >Log in with Google</button>
        </div>
    )
}