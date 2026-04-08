import { createContext, useContext, useEffect, useState } from "react";
import LoadingAnimation from "../components/loadingAnimation/loadingAnimation";
import { useParams } from "react-router-dom";
import { addComplex, getBayById } from "../http/substationAPI";

const BayContext = createContext();

export const useBay = () => {
    return useContext(BayContext);
};

const BayProvider = ({ children }) => {
    const { bay_id } = useParams();
    const [bay, setBay] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getBay(bay_id);
    }, [bay_id]);

    const getBay = async (bayId) => {
        try {
            const response = await getBayById(bayId);
            setBay(response.data);
            setLoading(false);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    const addNewComplex = async (complex) => {
        try {
            const response = await addComplex(bay.id, complex);
            setBay(response.data);
            setLoading(false);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <BayContext.Provider value={{ bay, addNewComplex }}>
            {!isLoading ? children : <LoadingAnimation />}
        </BayContext.Provider>
    );
};

export default BayProvider;
