import { useState } from "react";
import {
    ComplexBody,
    ComplexBottom,
    ComplexContainer,
    ComplexHeader,
    ComplexWrapper,
    SettingsButton,
} from "./styled";
import { TextAreaField, TextField } from "../../form";
import { useBay } from "../../../context/bayProvider";
import _ from "lodash";
import { MinusLogo, PlusLogo } from "../../common/images/";
import ProtectionItem from "../../protectionItem/protectionItem";

const Complex = ({ complex, onClose }) => {
    const isNewComplex = complex.id ? false : true;
    const [current, setCurrent] = useState(complex);
    const [visible, setVisible] = useState(false);
    const { addUpdateComplex } = useBay();

    const handleChange = ({ target }) => {
        setCurrent((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = async () => {
        addUpdateComplex(isNewComplex ? current : getChangedValues());
        onClose();
    };

    const closeForm = async () => {
        onClose();
    };

    const changeComplexForm = () => {
        setVisible((prevState) => !prevState);
    };

    const deleteComplex = () => {
        // setCurrent((prevState) => {
        //     const newProtections = [...prevState.protections];
        //     newProtections[0] = {
        //         ...newProtections[0],
        //         description: "1",
        //     };
        //     return {
        //         ...prevState,
        //         protections: newProtections,
        //     };
        // });

        console.log("Delete");
        console.log(complex);
    };

    const getChangedValues = () => {
        return {
            id: current.id,
            bay: current.bay,
            ...getDiferencies(current, complex),
        };
    };

    function getDiferencies(source, base) {
        return _.transform(source, (result, value, key) => {
            if (!_.isEqual(value, base[key])) {
                if (
                    (_.isPlainObject(value) && _.isPlainObject(base[key])) ||
                    (_.isArray(value) && _.isArray(base[key]))
                ) {
                    const deepDiff = getDiferencies(value, base[key]);
                    if (!_.isEmpty(deepDiff)) {
                        console.log(value, " ", key);
                        if (value.id) deepDiff.id = value.id;
                        if (value.isRoot) deepDiff.isRoot = value.isRoot;
                        result[key] = deepDiff;
                    }
                } else {
                    // Если примитив  — берем новое значение
                    result["id"] = source.id;
                    result[key] = value;
                }
            }
        });
    }

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
                    <SettingsButton onClick={changeComplexForm}>
                        <img
                            src={visible ? MinusLogo : PlusLogo}
                            alt={visible ? "Collapse group" : "Expland group"}
                        />
                        <p>Уставки</p>
                    </SettingsButton>
                    {visible && (
                        <>
                            {complex.protections?.map((prot) => (
                                <ProtectionItem key={prot.id} prot={prot} />
                            ))}
                        </>
                    )}
                </ComplexBody>
                <ComplexBottom>
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
                    <button onClick={handleSubmit}>
                        {isNewComplex ? "Добавить" : "Изменить"}
                    </button>
                </ComplexBottom>
            </ComplexWrapper>
        </ComplexContainer>
    );
};

export default Complex;
