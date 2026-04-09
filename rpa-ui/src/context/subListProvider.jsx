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
        const fetchData = async () => {
            setLoading(true);
            try {
                await Promise.all([getSubstations(), getBranches()]);
            } catch (e) {
                alert(e.response.data.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getSubstations = async () => {
        const { data } = await getAllSubstations();
        setSubs(data);
    };

    const getBranches = async () => {
        const { data } = await getAllBranches();
        setBranches(data);
    };

    const addUpdateSub = async (substation) => {
        try {
            const { data } = await addSubstation(substation);
            setSubs((prev) => {
                if (prev.some((item) => item.id === data.id)) {
                    return prev.map((item) =>
                        item.id === data.id ? data : item,
                    );
                } else {
                    return [...prev, data];
                }
            });
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <SubListContext.Provider value={{ subs, branches, addUpdateSub }}>
            {!isLoading ? children : <LoadingAnimation />}
        </SubListContext.Provider>
    );
};

export default SubListProvider;
