import { useImmer } from "use-immer";
import set from "lodash/set";
import {
    ProtectionContainer,
    ProtectionHeader,
    ProtectionWrapper,
    ProtectionBody,
    ProtectionButtons,
} from "./styled";
import { TextField } from "../../form";
import { Button } from "../../common/button";

const Protection = ({
    protection,
    onClose,
    addUpdateFolder,
    pathArray,
    index,
}) => {
    const isNewProtection = protection.id ? false : true;
    const [current, setCurrent] = useImmer(protection);

    const handleChange = (path, value) => {
        setCurrent((draft) => {
            set(draft, path, value);
        });
    };

    const handleSubmit = () => {
        // event.preventDefault();
        addUpdateFolder([...pathArray, index], current);
        onClose();
    };

    return (
        <ProtectionContainer>
            <ProtectionWrapper>
                <ProtectionHeader>
                    <h3>
                        {isNewProtection
                            ? "Добавить защиту:"
                            : "Редактировать защиту:"}
                    </h3>
                </ProtectionHeader>
                <ProtectionBody>
                    <TextField
                        label="Имя"
                        name="name"
                        value={current.name}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Описание"
                        name="description"
                        value={current.description}
                        onChange={handleChange}
                    />
                    <ProtectionButtons>
                        <Button onClick={onClose} variant="close">
                            Закрыть
                        </Button>
                        <Button onClick={handleSubmit}>
                            {isNewProtection ? "Добавить" : "Изменить"}
                        </Button>
                    </ProtectionButtons>
                </ProtectionBody>
            </ProtectionWrapper>
        </ProtectionContainer>
    );
};

export default Protection;
