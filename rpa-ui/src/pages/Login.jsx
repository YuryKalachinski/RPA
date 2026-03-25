import { useState } from "react";
import { LoginForm, RegisterForm } from "../components/loginForm";
import { useParams } from "react-router-dom";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login",
    );
    const toggleFormType = (params) => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register",
        );
    };

    return (
        <>
            {formType === "register" ? (
                <RegisterForm toggleFormType={toggleFormType} />
            ) : (
                <LoginForm toggleFormType={toggleFormType} />
            )}
        </>
    );
};

export default Login;
