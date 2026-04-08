import { useState } from "react";
import {
    ModalSubstationContainer,
    ModalSubstationHeader,
    ModalSubstatioWrapper,
    ModalSubstationBody,
    ModalSubstationButtons,
} from "./styled";
import { useSubList } from "../../../context/subListProvider";
import { TextAreaField, TextField, SelectField } from "../../form";

const ModalSubstation = ({ substation, onClose }) => {
    const isNewSub = substation.id ? false : true;
    const [current, setCurrent] = useState(substation);
    const { addSub, branches } = useSubList();

    const handleChange = ({ target }) => {
        setCurrent((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        addSub(isNewSub ? current : getChangedValues());
        onClose();
    };

    const closeForm = async (event) => {
        event.preventDefault();
        onClose();
    };

    const getChangedValues = () => {
        return Object.keys(current).reduce((acc, key) => {
            if (current[key] !== substation[key]) {
                acc[key] = current[key];
            }
            return acc;
        }, {});
    };

    return (
        <ModalSubstationContainer>
            <ModalSubstatioWrapper>
                <ModalSubstationHeader>
                    <h3>
                        {isNewSub
                            ? "Новая подстанция:"
                            : "Редактор подстанции:"}
                    </h3>
                </ModalSubstationHeader>
                <ModalSubstationBody>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя подстанции"
                            name="name"
                            value={current.name}
                            onChange={handleChange}
                        />
                        <SelectField
                            optionsArray={branches}
                            defaultOption="Выберете филиал"
                            label="Филиал"
                            name="branch"
                            value={current.branch}
                            onChange={handleChange}
                        />
                        <TextAreaField
                            label="Описание подстанции"
                            name="description"
                            value={current.description}
                            onChange={handleChange}
                        />
                        <ModalSubstationButtons>
                            <button className="closeButton" onClick={closeForm}>
                                Закрыть
                            </button>
                            <button>
                                {isNewSub ? "Добавить" : "Изменить"}
                            </button>
                        </ModalSubstationButtons>
                    </form>
                </ModalSubstationBody>
            </ModalSubstatioWrapper>
        </ModalSubstationContainer>
    );
};

export default ModalSubstation;
