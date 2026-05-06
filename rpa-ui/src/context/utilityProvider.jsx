import { createContext, useContext, useEffect, useState } from "react";
import {
    getAllBranches,
    getAllVoltageLevels,
    getProtDictionary,
    getParamDictionary,
} from "../http/utilityApi";
import { useAuth } from "./authProvider";

const UtilityContext = createContext();

export const useUtility = () => {
    return useContext(UtilityContext);
};

const UtilityProvider = ({ children }) => {
    const [protectionDictionary, setProtectionDictionary] = useState(new Map());
    const [parameterDictionary, setParameterDictionary] = useState(new Map());
    const [voltageLevelList, setVoltageLevelList] = useState([]);
    const [branches, setBranches] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser != null) {
            const fetchData = async () => {
                try {
                    await Promise.all([
                        getVoltageLevelList(),
                        getBranches(),
                        getParameterDictionary(),
                        getProtectionDictionary(),
                    ]);
                } catch (e) {
                    alert(e.response.data.message);
                }
            };

            fetchData();
        }
    }, [currentUser]);

    const getProtectionDictionary = async () => {
        const { data } = await getProtDictionary();
        setProtectionDictionary(new Map(data.map((p) => [p.name, p])));
    };

    const getParameterDictionary = async () => {
        const { data } = await getParamDictionary();
        setParameterDictionary(new Map(data.map((p) => [p.key, p])));
    };

    const getVoltageLevelList = async () => {
        const { data } = await getAllVoltageLevels();
        setVoltageLevelList(data);
    };

    const getBranches = async () => {
        const { data } = await getAllBranches();
        setBranches(data);
    };

    return (
        <UtilityContext.Provider
            value={{
                branches,
                voltageLevelList,
                parameterDictionary,
                protectionDictionary,
            }}
        >
            {children}
        </UtilityContext.Provider>
    );
};

export default UtilityProvider;
