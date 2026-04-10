import { useState } from "react";
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

const Bay = ({ bay, onClose }) => {
    const isNewBay = bay.id ? false : true;
    const [current, setCurrent] = useState(bay);
    const { addUpdateBay } = useSub();
    const { voltageLevelList } = useUtility();

    const handleChange = ({ target }) => {
        setCurrent((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
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
                    <form onSubmit={handleSubmit}>
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
                            <button className="closeButton" onClick={closeForm}>
                                Закрыть
                            </button>
                            <button>
                                {isNewBay ? "Добавить" : "Изменить"}
                            </button>
                        </BayButtons>
                    </form>
                </BayBody>
            </BayWrapper>
        </BayContainer>
    );
};

export default Bay;
