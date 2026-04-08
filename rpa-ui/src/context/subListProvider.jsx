import { createContext, useContext, useEffect, useState } from "react";
import {
    getAllSubstations,
    addSubstation,
    getAllBranches,
} from "../http/substationAPI";
import LoadingAnimation from "../components/loadingAnimation/loadingAnimation";

const SubListContext = createContext();

export const useSubList = () => {
    return useContext(SubListContext);
};

const SubListProvider = ({ children }) => {
    const [subs, setSubs] = useState([]);
    const [branches, setBranches] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getSubstations();
        getBranches();
        setLoading(false);
    }, []);

    const getSubstations = async () => {
        try {
            const response = await getAllSubstations();
            setSubs(response.data);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    const addSub = async (substation) => {
        try {
            const response = await addSubstation(substation);
            setSubs((prev) => [...prev, response.data]);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    const getBranches = async () => {
        try {
            const response = await getAllBranches();
            setBranches(response.data);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <SubListContext.Provider value={{ subs, branches, addSub }}>
            {!isLoading ? children : <LoadingAnimation />}
        </SubListContext.Provider>
    );
};

export default SubListProvider;
