import { useState } from "react";
import {
    NewSubstationContainer,
    NewSubstationHeader,
    NewSubstatioWrapper,
    NewSubstationBody,
    NewSubstationButtons,
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
        addSub(getChangedValues());
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
        <NewSubstationContainer>
            <NewSubstatioWrapper>
                <NewSubstationHeader>
                    <h3>
                        {isNewSub
                            ? "Новая подстанция:"
                            : "Редактор подстанции:"}
                    </h3>
                </NewSubstationHeader>
                <NewSubstationBody>
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
                        <NewSubstationButtons>
                            <button className="closeButton" onClick={closeForm}>
                                Закрыть
                            </button>
                            <button>
                                {isNewSub ? "Добавить" : "Изменить"}
                            </button>
                        </NewSubstationButtons>
                    </form>
                </NewSubstationBody>
            </NewSubstatioWrapper>
        </NewSubstationContainer>
    );
};

export default ModalSubstation;
