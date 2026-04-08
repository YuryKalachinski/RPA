import { useState } from "react";
import {
    NewComplexBody,
    NewComplexButtons,
    NewComplexContainer,
    NewComplexHeader,
    NewComplexWrapper,
} from "./styled";
import { TextAreaField, TextField } from "../../form/";
import { useBay } from "../../../context/bayProvider";

const NewComplex = ({ onClose }) => {
    const current = { name: "", description: "" };
    const { addNewComplex } = useBay();
    const [newComplex, setNewComplex] = useState(current);

    const handleChange = ({ target }) => {
        setNewComplex((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        addNewComplex(newComplex);
        setNewComplex(current);
        onClose();
    };

    const closeForm = async (event) => {
        event.preventDefault();
        setNewComplex(current);
        onClose();
    };

    return (
        <NewComplexContainer>
            <NewComplexWrapper>
                <NewComplexHeader>
                    <h3> Новый комплекс:</h3>
                </NewComplexHeader>
                <NewComplexBody>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Название комплекса"
                            name="name"
                            value={newComplex.name}
                            onChange={handleChange}
                        />
                        <TextAreaField
                            label="Описание комплекса"
                            name="description"
                            value={newComplex.description}
                            onChange={handleChange}
                        />
                        <NewComplexButtons>
                            <button className="closeButton" onClick={closeForm}>
                                Закрыть
                            </button>
                            <button>Добавить</button>
                        </NewComplexButtons>
                    </form>
                </NewComplexBody>
            </NewComplexWrapper>
        </NewComplexContainer>
    );
};

export default NewComplex;
