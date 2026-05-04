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
import { Button } from "../../common/button";

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

    const handleSubmit = async (event) => {
        event.preventDefault();
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
                        <Button onClick={onClose} variant="close">
                            Закрыть
                        </Button>
                        <Button onClick={handleSubmit}>
                            {isNewParameter ? "Добавить" : "Изменить"}
                        </Button>
                    </ParameterButtons>
                </ParameterBody>
            </ParameterWrapper>
        </ParameterContainer>
    );
};

export default Parameter;
