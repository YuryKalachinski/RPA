import PropTypes from "prop-types";
import { TextAreaFieldStyle } from "./styled";

const TextAreaField = ({ label, name, value, onChange }) => {
    return (
        <TextAreaFieldStyle>
            <label htmlFor={name}>{label}</label>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={label}
            />
        </TextAreaFieldStyle>
    );
};

TextAreaField.propsTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default TextAreaField;
