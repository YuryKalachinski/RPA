import { SelectFieldStyle } from "./styled";

const SelectField = ({
    optionsArray,
    defaultOption,
    name,
    label,
    value,
    onChange,
}) => {
    return (
        <SelectFieldStyle>
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name} value={value} onChange={onChange}>
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray.length > 0 &&
                    optionsArray.map((option) => (
                        <option value={option} key={option}>
                            {option}
                        </option>
                    ))}
            </select>
        </SelectFieldStyle>
    );
};

export default SelectField;
