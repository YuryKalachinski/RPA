import {
    LoginContainer,
    LoginCard,
    LoginHeader,
    LoginFormGroup,
    SignUpLink,
} from "./styled";

const RegisterForm = ({ toggleFormType }) => {
    return (
        <LoginContainer>
            <LoginCard>
                <LoginHeader>
                    <h3> Registration </h3>
                    <p> Registration Form isn't available now. </p>
                </LoginHeader>
                <LoginFormGroup></LoginFormGroup>
                <SignUpLink>
                    <p>
                        Already have an account?
                        <button onClick={toggleFormType}> Sign In </button>
                    </p>
                </SignUpLink>
            </LoginCard>
        </LoginContainer>
    );
};

export default RegisterForm;
