import { useState } from "react";
import {
    SubstationItemContainer,
    SubstationItemWrapper,
    SubstationItemBottom,
    SubstationItemTop,
    SubstationItemHeader,
    BayListItem,
    SubstationItemBody,
    NewBayListItem,
} from "./styled";
import { useNavigate, generatePath } from "react-router-dom";
import { BAY_ROUTE } from "../../utils/constants";
import { useSub } from "../../context/subProvider";
import { PlusLogo } from "../common/images/";
import { NewBay } from "../modal/";

const SubstationItem = () => {
    const { sub } = useSub();
    const navigate = useNavigate();
    const [isNewBayOpen, setNewBayOpen] = useState(false);

    const navigateToBay = (bay) => {
        const path = generatePath(BAY_ROUTE, {
            sub_id: sub.id,
            bay_id: bay.id,
        });
        navigate(path);
    };

    return (
        <>
            <SubstationItemContainer>
                <SubstationItemWrapper>
                    <SubstationItemTop>
                        <SubstationItemHeader>
                            <h3>Подстанция: {sub.name} </h3>
                            <p>Присоединения:</p>
                        </SubstationItemHeader>
                        <NewBayListItem>
                            <button onClick={() => setNewBayOpen(true)}>
                                <p>Добавить новое присоединение</p>
                                <img src={PlusLogo} alt="add new bay" />
                            </button>
                        </NewBayListItem>
                    </SubstationItemTop>
                    <SubstationItemBody>
                        {sub.bays.map((bay) => (
                            <BayListItem key={bay.id}>
                                <button onClick={() => navigateToBay(bay)}>
                                    {bay.name}
                                </button>
                            </BayListItem>
                        ))}
                    </SubstationItemBody>
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
            {isNewBayOpen && <NewBay onClose={() => setNewBayOpen(false)} />}
        </>
    );
};

export default SubstationItem;
