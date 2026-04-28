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
        addUpdateFolder([...pathArray, index], current);
        onClose();
    };

    return (
        <ProtectionContainer>
            <ProtectionWrapper>
                <ProtectionHeader>
                    <h3>
                        {isNewProtection ? "Новая папка:" : "Редактор папки:"}
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
                        <button className="closeButton" onClick={onClose}>
                            Закрыть
                        </button>
                        <button onClick={handleSubmit}>
                            {isNewProtection ? "Добавить" : "Изменить"}
                        </button>
                    </ProtectionButtons>
                </ProtectionBody>
            </ProtectionWrapper>
        </ProtectionContainer>
    );
};

export default Protection;
