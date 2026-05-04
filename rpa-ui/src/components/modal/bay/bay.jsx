import { useImmer } from "use-immer";
import set from "lodash/set";
import {
    BayContainer,
    BayHeader,
    BayWrapper,
    BayBody,
    BayButtons,
} from "./styled";
import { SelectField, TextAreaField, TextField } from "../../form";
import { useSub } from "../../../context/subProvider";
import { useUtility } from "../../../context/utilityProvider";
import { Button } from "../../common/button";

const Bay = ({ bay, onClose }) => {
    const isNewBay = bay.id ? false : true;
    const [current, setCurrent] = useImmer(bay);
    const { addUpdateBay } = useSub();
    const { voltageLevelList } = useUtility();

    const handleChange = (path, value) => {
        setCurrent((draft) => {
            set(draft, path, value);
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        addUpdateBay(isNewBay ? current : getChangedValues());
        onClose();
    };

    const closeForm = async (event) => {
        event.preventDefault();
        onClose();
    };

    const getChangedValues = () => {
        return Object.keys(current).reduce(
            (acc, key) => {
                if (current[key] !== bay[key]) {
                    acc[key] = current[key];
                }
                return acc;
            },
            { id: current.id, substation: current.substation },
        );
    };

    return (
        <BayContainer>
            <BayWrapper>
                <BayHeader>
                    <h3>
                        {isNewBay
                            ? "Новое присоединение:"
                            : "Редактор присоединения:"}
                    </h3>
                </BayHeader>
                <BayBody>
                    <TextField
                        label="Название присоединения"
                        name="name"
                        value={current.name}
                        onChange={handleChange}
                    />
                    <SelectField
                        optionsArray={voltageLevelList}
                        defaultOption="Класс напряжения"
                        label="Класс напряжения"
                        name="voltageLevel"
                        value={current.voltageLevel}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Номер присоединения"
                        name="cellNumber"
                        value={current.cellNumber}
                        onChange={handleChange}
                    />
                    <TextAreaField
                        label="Описание присоединения"
                        name="description"
                        value={current.description}
                        onChange={handleChange}
                    />
                    <BayButtons>
                        <Button onClick={closeForm} variant="close">
                            Закрыть
                        </Button>
                        <Button onClick={handleSubmit}>
                            {isNewBay ? "Добавить" : "Изменить"}
                        </Button>
                    </BayButtons>
                </BayBody>
            </BayWrapper>
        </BayContainer>
    );
};

export default Bay;
