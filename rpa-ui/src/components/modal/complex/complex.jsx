import { useState } from "react";
import { useImmer } from "use-immer";
import {
    ComplexBody,
    ComplexBottom,
    ComplexContainer,
    ComplexHeader,
    ComplexWrapper,
    SettingsButton,
    SettingsEdit,
    SettingsRow,
} from "./styled";
import { TextAreaField, TextField } from "../../form";
import { useBay } from "../../../context/bayProvider";
import { isEmpty, isEqual, isObject, set, transform } from "lodash";
import { FolderPlusLogo, MinusLogo, PlusLogo } from "../../common/images/";
import {
    Protection as ProtectionModal,
    Parameter as ParameterModal,
} from "../";
import ProtectionItem from "./protectionItem";

const Complex = ({ complex, onClose }) => {
    const [current, setCurrent] = useImmer(complex);
    const isNewComplex = current.id ? false : true;
    const [visible, setVisible] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [pathArray, setPathArray] = useState([]);
    const [index, setIndex] = useState();
    const { addUpdateComplex } = useBay();
    const [selectedObject, setSelectedObject] = useState();
    const [typeModal, setTypeModal] = useState("");
    const emptyProtection = {
        id: null,
        name: "",
        description: "",
        isRoot: true,
        parent: null,
        protAction: "NONE",
        complex: { id: current.id, name: current.name },
        children: [],
        parameterSettings: [],
        isDeleted: false,
    };

    const handleChange = (path, value) => {
        console.log(path);
        console.log(value);
        setCurrent((draft) => {
            set(draft, path, value);
        });
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
        console.log("Delete");
        console.log(current);
    };

    const getChangedValues = () => {
        return {
            id: current.id,
            bay: current.bay,
            ...getDifferences(current, complex),
        };
    };

    function getDifferences(source, base) {
        return transform(source, (result, value, key) => {
            if (!isEqual(value, base[key])) {
                if (isObject(value) && isObject(base[key])) {
                    const deepDiff = getDifferences(value, base[key]);
                    if (!isEmpty(deepDiff)) {
                        if (value.id) deepDiff.id = value.id;
                        result[key] = deepDiff;
                    }
                    // } else if (isArray(value) && isArray(base[key])) {
                    //     const deepDiff = getDifferences(value, base[key]);
                    //     if (!isEmpty(deepDiff)) {
                    //         if (value.id) deepDiff.id = value.id;
                    //         result[key] = deepDiff;
                    //     }
                } else {
                    result[key] = value;
                }
            }
        });
    }

    const openModal = (prot, array, ind, type) => {
        setSelectedObject(prot);
        setModalOpen(true);
        setPathArray(array);
        setIndex(ind);
        setTypeModal(type);
    };

    return (
        <>
            <ComplexContainer $isModalOpen={isModalOpen}>
                <ComplexWrapper>
                    <ComplexHeader>
                        <h3>
                            {isNewComplex
                                ? "Добавить новый комплекс защит:"
                                : "Редактор комплекса защит:"}
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
                        <SettingsRow>
                            <SettingsButton onClick={changeComplexForm}>
                                <img
                                    src={visible ? MinusLogo : PlusLogo}
                                    alt={
                                        visible
                                            ? "Collapse group"
                                            : "Expland group"
                                    }
                                />
                                <p>Уставки</p>
                            </SettingsButton>
                            <SettingsEdit>
                                {visible && (
                                    <img
                                        className="folderlogo"
                                        src={FolderPlusLogo}
                                        alt="Add root protection folder"
                                        onClick={() =>
                                            openModal(
                                                emptyProtection,
                                                ["protections"],
                                                current.protections.length,
                                                "prot",
                                            )
                                        }
                                    />
                                )}
                            </SettingsEdit>
                        </SettingsRow>
                        {visible && (
                            <>
                                {current.protections?.map((prot, protIndex) => (
                                    <ProtectionItem
                                        key={prot.id + prot.name}
                                        protection={prot}
                                        index={protIndex}
                                        pathArray={["protections"]}
                                        openModal={openModal}
                                    />
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
                            {/* {isNewComplex ? "Добавить" : "Изменить"} */}
                            Сохранить
                        </button>
                    </ComplexBottom>
                </ComplexWrapper>
            </ComplexContainer>
            {isModalOpen && (
                <>
                    {typeModal === "prot" ? (
                        <ProtectionModal
                            onClose={() => setModalOpen(false)}
                            addUpdateFolder={handleChange}
                            protection={selectedObject}
                            pathArray={pathArray}
                            index={index}
                        />
                    ) : (
                        <ParameterModal
                            onClose={() => setModalOpen(false)}
                            addUpdateParameter={handleChange}
                            parameter={selectedObject}
                            pathArray={pathArray}
                            index={index}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default Complex;
