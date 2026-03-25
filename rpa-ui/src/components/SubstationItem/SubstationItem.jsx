import {
    SubstationItemContainer,
    SubstationItemWrapper,
    SubstationItemBottom,
    SubstationItemTop,
    SubstationItemHeader,
    BayList,
    BayListItem,
} from "./styled";
import { useEffect, useState } from "react";
import { getSubstationById } from "../../http/substationAPI";
import { useParams, useNavigate, generatePath } from "react-router-dom";
import { BAY_ROUTE } from "../../utils/constants";

const SubstationItem = () => {
    const { id } = useParams();
    const [sub, setSub] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getSubstation(id);
    }, [id]);

    const getSubstation = async (subId) => {
        try {
            const response = await getSubstationById(subId);
            setSub(response.data);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    const navigateToBay = (bay) => {
        const path = generatePath(BAY_ROUTE, {
            sub_id: id,
            bay_id: bay.id,
        });
        navigate(path);
    };

    return (
        <SubstationItemContainer>
            <SubstationItemWrapper>
                {sub && (
                    <SubstationItemTop>
                        <SubstationItemHeader>
                            <h3>Подстанция: {sub.name} </h3>
                            <p>Присоединения:</p>
                        </SubstationItemHeader>
                        <BayList>
                            {sub.bays.map((bay) => (
                                <BayListItem key={bay.id}>
                                    <button onClick={() => navigateToBay(bay)}>
                                        {bay.name}
                                    </button>
                                </BayListItem>
                            ))}
                        </BayList>
                    </SubstationItemTop>
                )}
                <SubstationItemBottom>
                    <hr />
                    <button
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Назад
                    </button>
                </SubstationItemBottom>
            </SubstationItemWrapper>
        </SubstationItemContainer>
    );
};

export default SubstationItem;
