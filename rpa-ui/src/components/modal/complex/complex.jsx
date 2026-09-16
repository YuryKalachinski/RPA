import { useMemo, useState } from "react";
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
import { isEmpty, isEqual, isObject, set, transform } from "lodash";
import {
    FolderPlusLogo,
    MinusLogo,
    PlusLogo,
    TemplateLogo,
} from "../../common/images/";
import {
    Protection as ProtectionModal,
    Parameter as ParameterModal,
    Template as TemplateModal,
} from "../";
import ProtectionItem from "./protectionItem";
import { Tooltip } from "../../common/styledTooltip";
import { Button } from "../../common/button";
import { sortFromDictionary } from "../../../utils/methods";
import { useUtility } from "../../../context/utilityProvider";

const Complex = ({ complex, onClose, addUpdateComplex }) => {
    const [current, setCurrent] = useImmer(complex);
    const isNewComplex = current.id ? false : true;
    const [visible, setVisible] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [pathArray, setPathArray] = useState([]);
    const [index, setIndex] = useState();
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
    const { protectionDictionary } = useUtility();

    const sortedProtections = useMemo(() => {
        if (!current?.protections) return [];
        return [...current?.protections].sort((a, b) => {
            return sortFromDictionary(a.name, b.name, protectionDictionary);
        });
    }, [current?.protections, protectionDictionary]);

    const handleChange = (path, value) => {
        setCurrent((draft) => {
            set(draft, path, value);
        });
    };

    const handleSubmit = () => {
        addUpdateComplex(isNewComplex ? current : getChangedValues());
        onClose();
    };

    const closeForm = () => {
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
        setPathArray(array);
        setIndex(ind);
        setTypeModal(type);
        setModalOpen(true);
    };

    const renderModal = () => {
        const commonProps = {
            onClose: () => setModalOpen(false),
            pathArray: pathArray,
            index: index,
            unit: selectedObject,
            addUpdateUnit: handleChange,
        };

        switch (typeModal) {
            case "prot":
                return <ProtectionModal {...commonProps} />;
            case "param":
                return <ParameterModal {...commonProps} />;
            case "template":
                return (
                    // <TemplateModal
                    //     onClose={() => setModalOpen(false)}
                    //     unit={current}
                    //     setUnit={setCurrent}
                    // />
                    <TemplateModal {...commonProps} />
                );
            default:
                setModalOpen(false);
        }
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
                                <Tooltip
                                    content={
                                        visible
                                            ? "Скрыть уставки"
                                            : "Показать уставки"
                                    }
                                >
                                    <div>
                                        <img
                                            src={visible ? MinusLogo : PlusLogo}
                                            alt={
                                                visible
                                                    ? "Collapse group"
                                                    : "Expand group"
                                            }
                                        />
                                        <p>Уставки</p>
                                    </div>
                                </Tooltip>
                            </SettingsButton>
                            <SettingsEdit>
                                {visible && (
                                    <>
                                        <Tooltip content="Добавить защиту">
                                            <img
                                                src={FolderPlusLogo}
                                                alt="Add root protection folder"
                                                onClick={() =>
                                                    openModal(
                                                        emptyProtection,
                                                        ["protections"],
                                                        current.protections
                                                            .length,
                                                        "prot",
                                                    )
                                                }
                                            />
                                        </Tooltip>
                                        <Tooltip content="Вставить из шаблона">
                                            <img
                                                src={TemplateLogo}
                                                alt="Add from template"
                                                onClick={() =>
                                                    openModal(
                                                        emptyProtection,
                                                        ["protections"],
                                                        current.protections
                                                            .length,
                                                        "template",
                                                    )
                                                }
                                            />
                                        </Tooltip>
                                    </>
                                )}
                            </SettingsEdit>
                        </SettingsRow>
                        {visible && (
                            <>
                                {sortedProtections.map((prot, protIndx) => (
                                    <ProtectionItem
                                        key={protIndx}
                                        protection={prot}
                                        index={current.protections.indexOf(
                                            prot,
                                        )}
                                        pathArray={["protections"]}
                                        openModal={openModal}
                                    />
                                ))}
                            </>
                        )}
                    </ComplexBody>
                    <ComplexBottom>
                        <Button onClick={closeForm} variant="close">
                            Закрыть
                        </Button>
                        {!isNewComplex && (
                            <Button onClick={deleteComplex} variant="delete">
                                Удалить
                            </Button>
                        )}
                        <Button onClick={handleSubmit}>Сохранить</Button>
                    </ComplexBottom>
                </ComplexWrapper>
            </ComplexContainer>
            {isModalOpen && renderModal()}
        </>
    );
};

export default Complex;
