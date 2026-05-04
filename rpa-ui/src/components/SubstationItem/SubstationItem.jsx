import { useMemo, useState } from "react";
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
import { BAY_ROUTE, ROLE_ADMIN } from "../../utils/constants";
import { useSub } from "../../context/subProvider";
import { DeleteLogo, EditLogo, PlusLogo } from "../common/images/";
import { Bay as BayModal } from "../modal/";
import { Tooltip } from "../common/styledTooltip/styledTooltip";
import { useAuth } from "../../context/authProvider";
import { Button } from "../common/button";

const SubstationItem = () => {
    const { sub } = useSub();
    const { permission } = useAuth();
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

    const sortedBays = useMemo(() => {
        return [...sub.bays].sort((a, b) => a.name.localeCompare(b.name));
    }, [sub]);

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
            <SubstationItemContainer $isModalOpen={isModalOpen}>
                <SubstationItemWrapper>
                    <SubstationItemTop>
                        <SubstationItemHeader>
                            <h3>Подстанция: {sub.name} </h3>
                            <h4>{sub.description}</h4>
                            <p>Присоединения:</p>
                        </SubstationItemHeader>
                        {permission === ROLE_ADMIN && (
                            <NewBayItem>
                                <button onClick={() => editBay(emptyBay)}>
                                    <p>Добавить новое присоединение</p>
                                    <img src={PlusLogo} alt="add new bay" />
                                </button>
                            </NewBayItem>
                        )}
                    </SubstationItemTop>
                    <SubstationItemBody>
                        {sortedBays.map((bay) => (
                            <BayListItemRow key={bay.id}>
                                <BayListItem onClick={() => navigateToBay(bay)}>
                                    <Tooltip
                                        content={`Присоединение ${bay.voltageLevel} ${bay.name}`}
                                    >
                                        <p>{bay.name}</p>
                                    </Tooltip>
                                </BayListItem>
                                {permission === ROLE_ADMIN && (
                                    <>
                                        <BayListItemButton
                                            onClick={() => editBay(bay)}
                                        >
                                            <Tooltip content="Редактировать присоединение">
                                                <img
                                                    src={EditLogo}
                                                    alt="Edit current substation"
                                                />
                                            </Tooltip>
                                        </BayListItemButton>
                                        <BayListItemButton
                                            onClick={() => deleteBay(bay)}
                                        >
                                            <Tooltip content="Удалить присоединение">
                                                <img
                                                    src={DeleteLogo}
                                                    alt="Delete current substation"
                                                />
                                            </Tooltip>
                                        </BayListItemButton>
                                    </>
                                )}
                            </BayListItemRow>
                        ))}
                    </SubstationItemBody>
                    <SubstationItemBottom>
                        <hr />
                        <Button
                            onClick={() => {
                                navigate(-1);
                            }}
                            variant="back"
                        >
                            Назад
                        </Button>
                    </SubstationItemBottom>
                </SubstationItemWrapper>
            </SubstationItemContainer>
            {isModalOpen && (
                <BayModal
                    onClose={() => setModalOpen(false)}
                    bay={selectedBay}
                />
            )}
        </>
    );
};

export default SubstationItem;
