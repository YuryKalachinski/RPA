import { useState } from "react";
import {
    SubstationItemContainer,
    SubstationItemWrapper,
    SubstationItemBottom,
    SubstationItemTop,
    SubstationItemHeader,
    BayList,
    BayListItem,
} from "./styled";
import { useNavigate, generatePath } from "react-router-dom";
import { BAY_ROUTE } from "../../utils/constants";
import { useSub } from "../../context/subProvider";
import plus from "./images/plus.svg";
import NewBay from "../modal/newBay/newBay";

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
                    {sub && (
                        <SubstationItemTop>
                            <SubstationItemHeader>
                                <h3>Подстанция: {sub.name} </h3>
                                <p>Присоединения:</p>
                            </SubstationItemHeader>
                            <BayListItem>
                                <button onClick={() => setNewBayOpen(true)}>
                                    <p>Добавить новое присоединение</p>
                                    <img src={plus} alt="add new bay" />
                                </button>
                            </BayListItem>
                            <BayList>
                                {sub.bays.map((bay) => (
                                    <BayListItem key={bay.id}>
                                        <button
                                            onClick={() => navigateToBay(bay)}
                                        >
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
            <NewBay
                isOpen={isNewBayOpen}
                onClose={() => setNewBayOpen(false)}
            />
        </>
    );
};

export default SubstationItem;
