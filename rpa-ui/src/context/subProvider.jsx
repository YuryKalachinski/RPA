import { createContext, useContext, useEffect, useState } from "react";
import { getSubstationById } from "../http/substationAPI";
import { addBay } from "../http/bayApi";
import { useParams } from "react-router-dom";
import LoadingAnimation from "../components/loadingAnimation/loadingAnimation";

const SubContext = createContext();

export const useSub = () => {
    return useContext(SubContext);
};

const SubProvider = ({ children }) => {
    const { id } = useParams();
    const [sub, setSub] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await Promise.all([getSubstation(id)]);
            } catch (e) {
                alert(e.response.data.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const getSubstation = async (id) => {
        const response = await getSubstationById(id);
        setSub(response.data);
    };

    const addUpdateBay = async (bay) => {
        try {
            const { data } = await addBay(bay);
            setSub((prev) => {
                const isExist = prev.bays.some((item) => item.id === data.id);
                return {
                    ...prev,
                    bays: isExist
                        ? prev.bays.map((item) =>
                              item.id === data.id ? data : item,
                          )
                        : [...prev.bays, data],
                };
            });
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <SubContext.Provider value={{ sub, addUpdateBay }}>
            {!isLoading ? children : <LoadingAnimation />}
        </SubContext.Provider>
    );
};

export default SubProvider;
