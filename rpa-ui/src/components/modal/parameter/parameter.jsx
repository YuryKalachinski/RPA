import { useImmer } from "use-immer";
import set from "lodash/set";
import {
    ParameterContainer,
    ParameterHeader,
    ParameterWrapper,
    ParameterBody,
    ParameterButtons,
} from "./styled";
import { TextAreaField, TextField } from "../../form";

const Parameter = ({
    parameter,
    onClose,
    addUpdateParameter,
    pathArray,
    index,
}) => {
    const isNewParameter = parameter.id ? false : true;
    const [current, setCurrent] = useImmer(parameter);

    const handleChange = (path, value) => {
        setCurrent((draft) => {
            set(draft, path, value);
        });
    };

    const handleSubmit = () => {
        addUpdateParameter([...pathArray, index], current);
        onClose();
    };

    return (
        <ParameterContainer>
            <ParameterWrapper>
                <ParameterHeader>
                    <h3>
                        {isNewParameter
                            ? "Добавить уставку:"
                            : "Редактировать уставку:"}
                    </h3>
                </ParameterHeader>
                <ParameterBody>
                    <TextField
                        label="Параметер"
                        name="key"
                        value={current.key}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Значение"
                        name="value"
                        value={current.value}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Описание"
                        name="description"
                        value={current.description}
                        onChange={handleChange}
                    />
                    <TextAreaField
                        label="Комментарий"
                        name="comment"
                        value={current.comment}
                        onChange={handleChange}
                    />
                    <ParameterButtons>
                        <button className="closeButton" onClick={onClose}>
                            Закрыть
                        </button>
                        <button onClick={handleSubmit}>
                            {isNewParameter ? "Добавить" : "Изменить"}
                        </button>
                    </ParameterButtons>
                </ParameterBody>
            </ParameterWrapper>
        </ParameterContainer>
    );
};

export default Parameter;
