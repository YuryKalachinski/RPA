import { useState } from "react";
import {
    SubstationContainer,
    SubstationHeader,
    SubstationWrapper,
    SubstationBody,
    SubstationButtons,
} from "./styled";
import { useSubList } from "../../../context/subListProvider";
import { TextAreaField, TextField, SelectField } from "../../form";
import { useUtility } from "../../../context/utilityProvider";

const Substation = ({ substation, onClose }) => {
    const isNewSub = substation.id ? false : true;
    const [current, setCurrent] = useState(substation);
    const { addUpdateSub } = useSubList();
    const { branches } = useUtility();

    const handleChange = ({ target }) => {
        setCurrent((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        addUpdateSub(isNewSub ? current : getChangedValues());
        onClose();
    };

    const closeForm = async (event) => {
        event.preventDefault();
        onClose();
    };

    const getChangedValues = () => {
        return Object.keys(current).reduce(
            (acc, key) => {
                if (current[key] !== substation[key]) {
                    acc[key] = current[key];
                }
                return acc;
            },
            { id: current.id },
        );
    };

    return (
        <SubstationContainer>
            <SubstationWrapper>
                <SubstationHeader>
                    <h3>
                        {isNewSub
                            ? "Новая подстанция:"
                            : "Редактор подстанции:"}
                    </h3>
                </SubstationHeader>
                <SubstationBody>
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
                        <SubstationButtons>
                            <button className="closeButton" onClick={closeForm}>
                                Закрыть
                            </button>
                            <button>
                                {isNewSub ? "Добавить" : "Изменить"}
                            </button>
                        </SubstationButtons>
                    </form>
                </SubstationBody>
            </SubstationWrapper>
        </SubstationContainer>
    );
};

export default Substation;
