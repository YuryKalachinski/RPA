import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getAllTemplates } from "../http/templateApi";
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
                const { data } = await getAllTemplates();
                setTemplates(data);
            } catch (e) {
                const errorMessage =
                    e.response?.data?.message ||
                    "Произошла ошибка при загрузке";
                alert(errorMessage);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const templateGroups = useMemo(() => {
        return Object.groupBy(templates, (temp) => temp.manufacturer);
    }, [templates]);

    const contextValue = useMemo(
        () => ({
            templates,
            templateGroups,
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
