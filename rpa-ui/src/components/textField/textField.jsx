import { useState } from "react";
import PropTypes from "prop-types";
import { TextFieldStyle } from "./styled";
import viewOn from "./images/viewOn.svg";
import viewOff from "./images/viewOff.svg";

const TextField = ({ label, type, name, value, onChange, imgSrc, imgAlt }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <TextFieldStyle>
            <label htmlFor={name}>{label}</label>
            <img className="img_label" src={imgSrc} alt={imgAlt} />
            <input
                id={name}
                name={name}
                type={showPassword ? "text" : type}
                placeholder={label}
                value={value}
                onChange={onChange}
            />
            {type === "password" && (
                <img
                    className="img_visible"
                    src={showPassword ? viewOff : viewOn}
                    alt="set password visible"
                    onClick={toggleShowPassword}
                />
            )}
        </TextFieldStyle>
    );
};

TextField.defaultProps = {
    type: "text",
};

TextField.propsTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default TextField;
