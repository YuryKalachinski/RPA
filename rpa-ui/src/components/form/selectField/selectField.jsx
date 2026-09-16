import { SelectFieldStyle } from "./styled";

const SelectField = ({
    optionsArray = [],
    defaultOption,
    name,
    label,
    value,
    onChange,
}) => {
    return (
        <SelectFieldStyle>
            {label && <label htmlFor={name}>{label}</label>}
            <select
                name={name}
                id={name}
                value={value ?? ""}
                onChange={(e) => onChange(name, e.target.value)}
            >
                {defaultOption && (
                    <option disabled value="">
                        {defaultOption}
                    </option>
                )}
                {optionsArray.map((option) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
        </SelectFieldStyle>
    );
};

export default SelectField;
