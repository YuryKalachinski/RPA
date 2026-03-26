import { useState } from "react";
import TextField from "../../form/textField/textField";
import {
    NewSubstationContainer,
    NewSubstationHeader,
    NewSubstatioWrapper,
    NewSubstationBody,
    NewSubstationButtons,
} from "./styled";
import { useSubList } from "../../../context/subListProvider";
import SelectField from "../../form/selectField/selectField";

const NewSubstation = ({ isOpen, onClose }) => {
    const current = { name: "", branch: "", description: "" };
    const [newSub, setNewSub] = useState(current);
    const { addSubstation, branches } = useSubList();

    const handleChange = ({ target }) => {
        setNewSub((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        addSubstation(newSub);
        setNewSub(current);
        onClose();
    };

    const closeForm = async (event) => {
        event.preventDefault();
        setNewSub(current);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <NewSubstationContainer>
                    <NewSubstatioWrapper>
                        <NewSubstationHeader>
                            <h3> Добавить новую подстанцию</h3>
                        </NewSubstationHeader>
                        <NewSubstationBody>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя подстанции"
                                    name="name"
                                    value={newSub.name}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Описание подстанции"
                                    name="description"
                                    value={newSub.description}
                                    onChange={handleChange}
                                />
                                <SelectField
                                    optionsArray={branches}
                                    defaultOption="Выберете филиал"
                                    label="Филиал"
                                    name="branch"
                                    value={newSub.branch}
                                    onChange={handleChange}
                                />
                                <NewSubstationButtons>
                                    <button
                                        className="closeButton"
                                        onClick={closeForm}
                                    >
                                        Закрыть
                                    </button>
                                    <button>Добавить</button>
                                </NewSubstationButtons>
                            </form>
                        </NewSubstationBody>
                    </NewSubstatioWrapper>
                </NewSubstationContainer>
            )}
        </>
    );
};

export default NewSubstation;
