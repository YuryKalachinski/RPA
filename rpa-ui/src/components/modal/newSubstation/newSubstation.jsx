import { useState } from "react";
import TextField from "../../textField/textField";
import {
    NewSubstationContainer,
    NewSubstationHeader,
    NewSubstatioWrapper,
    NewSubstationBody,
} from "./styled";

const NewSubstation = ({ isOpen, onClose }) => {
    const [substation, setSubstation] = useState({ name: "" });

    const handleChange = ({ target }) => {
        setSubstation((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = async (event) => {};

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
                                    value={substation.name}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Описание подстанции"
                                    name="description"
                                    value={substation.description}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Филиал"
                                    name="branch"
                                    value={substation.branch}
                                    onChange={handleChange}
                                />
                            </form>
                            <div onClick={(e) => e.stopPropagation()}>
                                <button onClick={onClose}>Закрыть</button>
                            </div>
                        </NewSubstationBody>
                    </NewSubstatioWrapper>
                </NewSubstationContainer>
            )}
        </>
    );
};

export default NewSubstation;
