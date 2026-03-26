import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authProvider";
import { MAIN_ROUTE } from "../../utils/constants";
import {
    LoginContainer,
    LoginCard,
    LoginHeader,
    LoginFormGroup,
    SignUpLink,
} from "./styled";
import emailLogo from "./images/email.svg";
import passwordLogo from "./images/password.svg";
import TextField from "../form/textField/textField";

const LoginForm = ({ toggleFormType }) => {
    const { logIn } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: "", password: "" });

    const handleChange = ({ target }) => {
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await logIn(user);

            // history.push(
            //     history.location.state
            //         ? history.location.state.from.pathname
            //         : "/"

            navigate(MAIN_ROUTE);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <LoginContainer>
            <LoginCard>
                <LoginHeader>
                    <h3> Welcome Back </h3>
                    <p>Sign in to your account</p>
                </LoginHeader>
                <LoginFormGroup>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            imgSrc={emailLogo}
                            imgAlt="email address"
                            label="Email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                        <TextField
                            imgSrc={passwordLogo}
                            imgAlt="password"
                            label="Password"
                            name="password"
                            type="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                        <button>Sign In</button>
                    </form>
                </LoginFormGroup>
                <SignUpLink>
                    <p>
                        Don't have an account?
                        <button onClick={toggleFormType}>Sign Up</button>
                    </p>
                </SignUpLink>
            </LoginCard>
        </LoginContainer>
    );
};

export default LoginForm;
