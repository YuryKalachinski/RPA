import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { addTemplate, getAllTemplates } from "../http/templateApi";
import { LoadingAnimation } from "../components/loadingAnimation";

const TemplateContext = createContext();

export const useTemplate = () => {
    return useContext(TemplateContext);
};

const TemplateProvider = ({ children }) => {
    const [templates, setTemplates] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await getAllTemplates();
                setTemplates(data);
            } catch (e) {
                const errorMessage =
                    e.response?.data?.message ||
                    "Произошла ошибка при загрузке шаблонов";
                alert(errorMessage);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const addUpdateTemplate = async (template) => {
        try {
            const { data } = await addTemplate(template);
            setTemplates((prev) => {
                const isExist = prev.some((item) => item.id === data.id);
                return isExist
                    ? prev.map((item) => (item.id === data.id ? data : item))
                    : [...prev, data];
            });
        } catch (e) {
            const errorMessage =
                e.response?.data?.message || "Не удалось сохранить шаблон.";
            alert(errorMessage);
        }
    };

    const templateGroups = useMemo(() => {
        return Object.groupBy(
            templates,
            (temp) => temp.complex.manufacturer ?? "Без производителя",
        );
    }, [templates]);

    const contextValue = useMemo(
        () => ({
            templates,
            templateGroups,
            addUpdateTemplate,
        }),
        [templates, templateGroups],
    );

    return (
        <TemplateContext.Provider value={contextValue}>
            {!isLoading ? children : <LoadingAnimation />}
        </TemplateContext.Provider>
    );
};

export default TemplateProvider;
