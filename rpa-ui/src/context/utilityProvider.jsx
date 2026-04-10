import { createContext, useContext, useEffect, useState } from "react";
import { getAllBranches, getAllVoltageLevels } from "../http/utilityApi";

const UtilityContext = createContext();

export const useUtility = () => {
    return useContext(UtilityContext);
};

const UtilityProvider = ({ children }) => {
    const [voltageLevelList, setVoltageLevelList] = useState([]);
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([getVoltageLevelList(), getBranches()]);
            } catch (e) {
                alert(e.response.data.message);
            }
        };

        fetchData();
    }, []);

    const getVoltageLevelList = async () => {
        const { data } = await getAllVoltageLevels();
        setVoltageLevelList(data);
    };

    const getBranches = async () => {
        const { data } = await getAllBranches();
        setBranches(data);
    };

    return (
        <UtilityContext.Provider value={{ branches, voltageLevelList }}>
            {children}
        </UtilityContext.Provider>
    );
};

export default UtilityProvider;
