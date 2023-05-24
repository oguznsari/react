import { useState } from "react";
import { useHistory } from "react-router-dom";

export const SignUpPage = () => {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const history = useHistory();

    const onSignUpClicked = async () => {
        alert('signup not implemented yet!');
    }

    return (
        <div className="content-container">
            {
                errorMessage &&
                <div className="fail">{errorMessage}</div>
            }
            <h1>Sign Up</h1>
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
            <input
                value={confirmPasswordValue}
                onChange={e => setConfirmPasswordValue(e.target.value)}
                type="password"
                placeholder="confirm-password" />
            <button
                disabled={
                    !emailValue
                    || !passwordValue
                    || passwordValue !== confirmPasswordValue
                }
                onClick={onSignUpClicked}>
                Sign Up</button>
            <button
                onClick={() => history.push('/login')}>
                Already have an account? Log In</button>
        </div>
    )
}