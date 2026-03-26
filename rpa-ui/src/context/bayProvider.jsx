import { createContext, useContext, useEffect, useState } from "react";
import LoadingAnimation from "../components/loadingAnimation/loadingAnimation";
import { useParams } from "react-router-dom";
import { getSubstationBySubstationIdAndBayId } from "../http/substationAPI";

const BayContext = createContext();

export const useBay = () => {
    return useContext(BayContext);
};

const BayProvider = ({ children }) => {
    const { sub_id, bay_id } = useParams();
    const [sub, setSub] = useState();
    const [complexes, setComplexes] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getSubstation(sub_id, bay_id);
    }, [sub_id, bay_id]);

    const getSubstation = async (sub_id, bay_id) => {
        try {
            const response = await getSubstationBySubstationIdAndBayId(
                sub_id,
                bay_id,
            );
            setSub(response.data);
            setComplexes(response.data.bays[0].complexes);
            setLoading(false);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <BayContext.Provider value={{ sub, complexes }}>
            {!isLoading ? children : <LoadingAnimation />}
        </BayContext.Provider>
    );
};

export default BayProvider;
