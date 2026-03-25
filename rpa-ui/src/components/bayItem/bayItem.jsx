import { useEffect, useState } from "react";
import { getSubstationBySubstationIdAndBayId } from "../../http/substationAPI";
import { useParams, useNavigate } from "react-router-dom";
import {
    BayItemBottom,
    BayItemContainer,
    BayItemHeader,
    BayItemTop,
    BayItemWrapper,
    ComplexList,
} from "./styled";
import ComplexItem from "../complexItem/complexItem";

const BayItem = () => {
    const { sub_id, bay_id } = useParams();
    const [sub, setSub] = useState(null);
    const [complexes, setComplexes] = useState([]);
    const navigate = useNavigate();

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
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <BayItemContainer>
            <BayItemWrapper>
                <BayItemTop>
                    <BayItemHeader>
                        <h3>{sub?.name}</h3>
                        <p>{sub?.bays[0]?.name}:</p>
                    </BayItemHeader>
                    <ComplexList>
                        {complexes.map((el) => (
                            <ComplexItem key={el.id} complex={el} />
                        ))}
                    </ComplexList>
                </BayItemTop>
                <BayItemBottom>
                    <hr />
                    <button
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Назад
                    </button>
                </BayItemBottom>
            </BayItemWrapper>
        </BayItemContainer>
    );
};

export default BayItem;
