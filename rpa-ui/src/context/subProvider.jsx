import { createContext, useContext, useEffect, useState } from "react";
import { getSubstationById } from "../http/substationAPI";
import { useParams } from "react-router-dom";
import LoadingAnimation from "../components/loadingAnimation/loadingAnimation";

const SubContext = createContext();

export const useSub = () => {
    return useContext(SubContext);
};

const SubProvider = ({ children }) => {
    const { id } = useParams();
    const [sub, setSub] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getSubstation(id);
    }, [id]);

    const getSubstation = async (subId) => {
        try {
            const response = await getSubstationById(subId);
            setSub(response.data);
            setLoading(false);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <SubContext.Provider value={{ sub }}>
            {!isLoading ? children : <LoadingAnimation />}
        </SubContext.Provider>
    );
};

export default SubProvider;
