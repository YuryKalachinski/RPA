import { useState } from "react";
import {
    NewBayContainer,
    NewBayHeader,
    NewBayWrapper,
    NewBayBody,
    NewBayButtons,
} from "./styled";
import TextField from "../../form/textField/textField";
import { useSub } from "../../../context/subProvider";

const NewBay = ({ isOpen, onClose }) => {
    const current = {
        name: "",
        description: "",
        voltageLevel: "ONE_HUNDRED_TEN",
        cellNumber: "",
    };
    const [newBay, setNewBay] = useState(current);
    const { addNewBay } = useSub();

    const handleChange = ({ target }) => {
        setNewBay((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        addNewBay(newBay);
        setNewBay(current);
        onClose();
    };

    const closeForm = async (event) => {
        event.preventDefault();
        setNewBay(current);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <NewBayContainer>
                    <NewBayWrapper>
                        <NewBayHeader>
                            <h3> Добавить новое присоединение</h3>
                        </NewBayHeader>
                        <NewBayBody>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Название присоединения"
                                    name="name"
                                    value={newBay.name}
                                    onChange={handleChange}
                                />

                                {/* <SelectField
                                    optionsArray={branches}
                                    defaultOption="Выберете филиал"
                                    label="Филиал"
                                    name="branch"
                                    value={newSub.branch}
                                    onChange={handleChange}
                                />
                                <TextAreaField
                                    label="Описание подстанции"
                                    name="description"
                                    value={newSub.description}
                                    onChange={handleChange}
                                /> */}
                                <NewBayButtons>
                                    <button
                                        className="closeButton"
                                        onClick={closeForm}
                                    >
                                        Закрыть
                                    </button>
                                    <button>Добавить</button>
                                </NewBayButtons>
                            </form>
                        </NewBayBody>
                    </NewBayWrapper>
                </NewBayContainer>
            )}
        </>
    );
};

export default NewBay;
