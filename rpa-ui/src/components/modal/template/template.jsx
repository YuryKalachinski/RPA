// import set from "lodash/set";
import {
    TemplateContainer,
    TemplateHeader,
    TemplateWrapper,
    TemplateBody,
    TemplateButtons,
} from "./styled";
import { SelectField } from "../../form";
import { Button } from "../../common/button";
import { useTemplate } from "../../../context/templateProvider";
import { useMemo, useState } from "react";

const Template = ({ unit, onClose, addUpdateUnit, pathArray }) => {
    const [current, setCurrent] = useState({
        manufacturer: "",
        model: "",
    });
    const { templateGroups } = useTemplate();

    const handleChange = (name, value) => {
        setCurrent((prev) => {
            const updated = { ...prev, [name]: value };

            if (name === "manufacturer") {
                updated.model = "";
            }

            return updated;
        });
    };

    const selectedTemplate = useMemo(() => {
        const { manufacturer, model } = current;
        if (!manufacturer || !model || !templateGroups[manufacturer]) {
            return null;
        }
        return (
            templateGroups[manufacturer].find(
                (template) => template.name === model,
            ) || null
        );
    }, [current, templateGroups]);

    const handleSubmit = () => {
        if (!selectedTemplate?.complex) return;

        const complex = structuredClone(selectedTemplate.complex);
        addUpdateUnit([...pathArray], resetChildId(complex.protections));
        onClose();
    };

    const resetChildId = (children) => {
        if (!children) return children;

        for (const child of children) {
            child.id = null;
            if (child.complex) {
                child.complex.id = null;
            }
            if (child.protection) {
                child.protection.id = null;
            }
            resetChildId(child.children);
            if (child.parameterSettings) {
                resetChildId(child.parameterSettings);
            }
        }
        return children;
    };

    const modelsOptions = useMemo(() => {
        const selectedBrand = current.manufacturer;

        if (!selectedBrand || !templateGroups[selectedBrand]) {
            return [];
        }

        return templateGroups[selectedBrand].map((templ) => templ.name);
    }, [current.manufacturer, templateGroups]);

    return (
        <TemplateContainer>
            <TemplateWrapper>
                <TemplateHeader>
                    <h3>Добавить из шаблона</h3>
                </TemplateHeader>
                <TemplateBody>
                    <SelectField
                        name="manufacturer"
                        label="Производитель"
                        defaultOption="-- Выберите бренд --"
                        value={current.manufacturer}
                        optionsArray={Object.keys(templateGroups)}
                        onChange={handleChange}
                    />

                    <SelectField
                        name="model"
                        label="Модель шаблона"
                        defaultOption={
                            current.manufacturer
                                ? "-- Выберите модель --"
                                : "-- Сначала выберите производителя --"
                        }
                        value={current.model}
                        optionsArray={modelsOptions}
                        onChange={handleChange}
                    />
                    <TemplateButtons>
                        <Button onClick={onClose} variant="close">
                            Закрыть
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={!selectedTemplate}
                        >
                            Добавить
                        </Button>
                    </TemplateButtons>
                </TemplateBody>
            </TemplateWrapper>
        </TemplateContainer>
    );
};

export default Template;
