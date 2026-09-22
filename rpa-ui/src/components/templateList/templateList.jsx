import { useTemplate } from "../../context/templateProvider";
import {
    NewTemplateItem,
    TemplateComplexItem,
    TemplateComplexItemClose,
    TemplateListBody,
    TemplateListBodyGroup,
    TemplateListBodyItem,
    TemplateListBottom,
    TemplateListContainer,
    TemplateListHeader,
    TemplateListTop,
    TemplateListWrapper,
} from "./styled";
import TemplateGroup from "../templateGroup/templateGroup";
import { Complex as ComplexModal } from "../modal";
import { Button } from "../common/button";
import { useNavigate } from "react-router-dom";
import { ROLE_ADMIN } from "../../utils/constants";
import { useAuth } from "../../context/authProvider";
import { PlusLogo, CloseLogo } from "../common/images/";
import { useEffect, useState } from "react";
import { ComplexItem } from "../complexItem";
import { Tooltip } from "../common/styledTooltip";

const TemplateList = () => {
    const { templates, templateGroups, addUpdateTemplate } = useTemplate();
    const navigate = useNavigate();
    const { permission } = useAuth();
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const emptyTemplate = {
        id: "",
        name: "",
        manufacturer: "",
        complex: {
            name: "",
            description: "",
            manufacturer: "",
            isDeleted: false,
            id: "",
            protections: [],
        },
    };

    useEffect(() => {
        if (selectedTemplate && selectedTemplate.id) {
            const updated = templates.find((t) => t.id === selectedTemplate.id);
            if (updated) {
                setSelectedTemplate(updated);
            }
        }
    }, [templates, selectedTemplate]);

    const addNewTemplate = () => {
        setSelectedTemplate(emptyTemplate);
        setModalOpen(true);
    };

    const addUpdateComplex = async (complex) => {
        const updatedTemplate = {
            ...selectedTemplate,
            manufacturer:
                complex?.manufacturer ||
                selectedTemplate.manufacturer ||
                "Без производителя",
            name: complex?.name || selectedTemplate.name || "Новый шаблон",
            complex: complex,
        };

        await addUpdateTemplate(updatedTemplate);

        if (!selectedTemplate.id) {
            setSelectedTemplate(null);
        }

        setModalOpen(false);
    };

    const selectTemplate = (templ) => {
        if (templ === selectedTemplate) {
            setSelectedTemplate(null);
        } else {
            setSelectedTemplate(templ);
        }
    };

    const closeTemplate = () => {
        setSelectedTemplate(null);
    };

    return (
        <>
            <TemplateListContainer>
                <TemplateListWrapper>
                    <TemplateListTop>
                        <TemplateListHeader>
                            <h3>Шаблоны защит:</h3>
                        </TemplateListHeader>
                        {permission === ROLE_ADMIN && (
                            <NewTemplateItem>
                                <button onClick={() => addNewTemplate()}>
                                    <p>Добавить новый шаблон</p>
                                    <img
                                        src={PlusLogo}
                                        alt="add new template"
                                    />
                                </button>
                            </NewTemplateItem>
                        )}
                    </TemplateListTop>
                    <TemplateListBody>
                        <TemplateListBodyGroup>
                            {Object.entries(templateGroups).map(
                                ([manufacturer, temps]) => (
                                    <TemplateGroup
                                        key={manufacturer}
                                        manufacturer={manufacturer}
                                        temps={temps}
                                        selectTemplate={selectTemplate}
                                        selectedTemplate={selectedTemplate}
                                    />
                                ),
                            )}
                        </TemplateListBodyGroup>
                        <TemplateListBodyItem>
                            {selectedTemplate?.name && (
                                <TemplateComplexItem>
                                    <TemplateComplexItemClose
                                        onClick={closeTemplate}
                                    >
                                        <Tooltip content="Закрыть шаблон">
                                            <img
                                                src={CloseLogo}
                                                alt="Close template"
                                            />
                                        </Tooltip>
                                    </TemplateComplexItemClose>
                                    <ComplexItem
                                        complex={selectedTemplate.complex}
                                        editComplex={() => setModalOpen(true)}
                                    />
                                </TemplateComplexItem>
                            )}
                        </TemplateListBodyItem>
                    </TemplateListBody>
                    <TemplateListBottom>
                        <hr />
                        <Button
                            onClick={() => {
                                navigate(-1);
                            }}
                            variant="back"
                        >
                            Назад
                        </Button>
                    </TemplateListBottom>
                </TemplateListWrapper>
            </TemplateListContainer>
            {isModalOpen && (
                <ComplexModal
                    onClose={() => setModalOpen(false)}
                    complex={selectedTemplate.complex}
                    addUpdateComplex={addUpdateComplex}
                />
            )}
        </>
    );
};

export default TemplateList;
