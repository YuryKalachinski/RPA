import { createContext, useContext, useEffect, useState } from "react";
import LoadingAnimation from "../components/loadingAnimation/loadingAnimation";
import { useParams } from "react-router-dom";
import { addComplex } from "../http/complexApi";
import { getBayById } from "../http/bayApi";

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

    const addUpdateComplex = async (complex) => {
        console.log(complex);
        try {
            const { data } = await addComplex(complex);
            setBay((prev) => {
                const isExist = prev.complexes.some(
                    (item) => item.id === data.id,
                );
                return {
                    ...prev,
                    complexes: isExist
                        ? prev.complexes.map((item) =>
                              item.id === data.id ? data : item,
                          )
                        : [...prev.complexes, data],
                };
            });
            setLoading(false);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <BayContext.Provider value={{ bay, addUpdateComplex }}>
            {!isLoading ? children : <LoadingAnimation />}
        </BayContext.Provider>
    );
};

export default BayProvider;
