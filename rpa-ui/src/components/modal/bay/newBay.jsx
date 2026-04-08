import { useState } from "react";
import {
    NewBayContainer,
    NewBayHeader,
    NewBayWrapper,
    NewBayBody,
    NewBayButtons,
} from "./styled";
import { TextField } from "../../form/";
import { useSub } from "../../../context/subProvider";

const NewBay = ({ onClose }) => {
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
        <NewBayContainer>
            <NewBayWrapper>
                <NewBayHeader>
                    <h3> Новое присоединение:</h3>
                </NewBayHeader>
                <NewBayBody>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Название присоединения"
                            name="name"
                            value={newBay.name}
                            onChange={handleChange}
                        />
                        <NewBayButtons>
                            <button className="closeButton" onClick={closeForm}>
                                Закрыть
                            </button>
                            <button>Добавить</button>
                        </NewBayButtons>
                    </form>
                </NewBayBody>
            </NewBayWrapper>
        </NewBayContainer>
    );
};

export default NewBay;
