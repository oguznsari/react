import { useState } from "react";
import { useHistory } from "react-router-dom";

export const LogInPage = () => {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const history = useHistory();

    const onLogInClicked = async () => {
        alert('login not implemented yet!');
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
        </div>
    )
}