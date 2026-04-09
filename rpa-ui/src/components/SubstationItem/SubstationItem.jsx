import { useState } from "react";
import {
    SubstationItemContainer,
    SubstationItemWrapper,
    SubstationItemBottom,
    SubstationItemTop,
    SubstationItemHeader,
    NewBayItem,
    SubstationItemBody,
    BayListItem,
    BayListItemRow,
    BayListItemButton,
} from "./styled";
import { useNavigate, generatePath } from "react-router-dom";
import { BAY_ROUTE } from "../../utils/constants";
import { useSub } from "../../context/subProvider";
import { DeleteLogo, EditLogo, PlusLogo } from "../common/images/";
import { Bay } from "../modal/";

const SubstationItem = () => {
    const { sub } = useSub();
    const emptyBay = {
        name: "",
        description: "",
        voltageLevel: "",
        cellNumber: "",
        substation: { id: sub.id, name: sub.name },
    };
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedBay, setSelectedBay] = useState(emptyBay);
    const navigate = useNavigate();

    const navigateToBay = (bay) => {
        const path = generatePath(BAY_ROUTE, {
            sub_id: sub.id,
            bay_id: bay.id,
        });
        navigate(path);
    };

    const editBay = (current) => {
        setSelectedBay(current);
        setModalOpen(true);
    };

    const deleteBay = (current) => {
        console.log("Delete");
        console.log(current);
    };

    return (
        <>
            <SubstationItemContainer>
                <SubstationItemWrapper>
                    <SubstationItemTop>
                        <SubstationItemHeader>
                            <h3>Подстанция: {sub.name} </h3>
                            <h4>{sub.description}</h4>
                            <p>Присоединения:</p>
                        </SubstationItemHeader>
                        <NewBayItem>
                            <button onClick={() => editBay(emptyBay)}>
                                <p>Добавить новое присоединение</p>
                                <img src={PlusLogo} alt="add new bay" />
                            </button>
                        </NewBayItem>
                    </SubstationItemTop>
                    <SubstationItemBody>
                        {sub.bays.map((bay) => (
                            <BayListItemRow key={bay.id}>
                                <BayListItem onClick={() => navigateToBay(bay)}>
                                    {bay.name}
                                </BayListItem>
                                <BayListItemButton onClick={() => editBay(bay)}>
                                    <img
                                        src={EditLogo}
                                        alt="Edit current substation"
                                    />
                                </BayListItemButton>
                                <BayListItemButton
                                    onClick={() => deleteBay(bay)}
                                >
                                    <img
                                        src={DeleteLogo}
                                        alt="Delete current substation"
                                    />
                                </BayListItemButton>
                            </BayListItemRow>
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
            {isModalOpen && (
                <Bay onClose={() => setModalOpen(false)} bay={selectedBay} />
            )}
        </>
    );
};

export default SubstationItem;
