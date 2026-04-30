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
import { EmailLogo, PasswordLogo } from "../common/images/";
import { TextField } from "../form/";
import { useImmer } from "use-immer";
import { set } from "lodash";

const LoginForm = ({ toggleFormType }) => {
    const { logIn } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useImmer({ email: "", password: "" });

    const handleChange = (path, value) => {
        setUser((draft) => {
            set(draft, path, value);
        });
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
                            imgSrc={EmailLogo}
                            imgAlt="email address"
                            label="Email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                        <TextField
                            imgSrc={PasswordLogo}
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
