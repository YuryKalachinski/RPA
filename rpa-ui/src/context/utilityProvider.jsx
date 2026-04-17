import { createContext, useContext, useEffect, useState } from "react";
import { getAllBranches, getAllVoltageLevels } from "../http/utilityApi";
import { useAuth } from "./authProvider";

const UtilityContext = createContext();

export const useUtility = () => {
    return useContext(UtilityContext);
};

const UtilityProvider = ({ children }) => {
    const [voltageLevelList, setVoltageLevelList] = useState([]);
    const [branches, setBranches] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser != null) {
            const fetchData = async () => {
                try {
                    await Promise.all([getVoltageLevelList(), getBranches()]);
                } catch (e) {
                    alert(e.response.data.message);
                }
            };

            fetchData();
        }
    }, [currentUser]);

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
