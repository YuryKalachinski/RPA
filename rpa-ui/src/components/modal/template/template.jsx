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
        addUpdateUnit([...pathArray], selectedTemplate.complex.protections);
        onClose();
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
                        optionsArray={Object.keys(templateGroups) || []}
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
                        <Button onClick={handleSubmit}>Добавить</Button>
                    </TemplateButtons>
                </TemplateBody>
            </TemplateWrapper>
        </TemplateContainer>
    );
};

export default Template;
