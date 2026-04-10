import { useState } from "react";
import {
    ComplexBody,
    ComplexButtons,
    ComplexContainer,
    ComplexHeader,
    ComplexWrapper,
} from "./styled";
import { TextAreaField, TextField } from "../../form";
import { useBay } from "../../../context/bayProvider";

const Complex = ({ complex, onClose }) => {
    const isNewComplex = complex.id ? false : true;
    const [current, setCurrent] = useState(complex);
    const { addUpdateComplex } = useBay();

    const handleChange = ({ target }) => {
        setCurrent((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        addUpdateComplex(current);
        onClose();
    };

    const closeForm = async (event) => {
        event.preventDefault();
        onClose();
    };

    const deleteComplex = (event) => {
        event.preventDefault();
        console.log("Delete");
        console.log(complex);
    };

    return (
        <ComplexContainer>
            <ComplexWrapper>
                <ComplexHeader>
                    <h3>
                        {isNewComplex
                            ? "Новая подстанция:"
                            : "Редактор подстанции:"}
                    </h3>
                </ComplexHeader>
                <ComplexBody>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Название комплекса"
                            name="name"
                            value={current.name}
                            onChange={handleChange}
                        />
                        <TextAreaField
                            label="Описание комплекса"
                            name="description"
                            value={current.description}
                            onChange={handleChange}
                        />
                        <ComplexButtons>
                            <button className="closeButton" onClick={closeForm}>
                                Закрыть
                            </button>
                            {!isNewComplex && (
                                <button
                                    className="deleteButton"
                                    onClick={deleteComplex}
                                >
                                    Удалить
                                </button>
                            )}
                            <button>
                                {isNewComplex ? "Добавить" : "Изменить"}
                            </button>
                        </ComplexButtons>
                    </form>
                </ComplexBody>
            </ComplexWrapper>
        </ComplexContainer>
    );
};

export default Complex;
