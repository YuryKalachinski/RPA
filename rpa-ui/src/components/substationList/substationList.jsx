import { useState, useMemo } from "react";
import { SubstationListFilter } from "../substationListFilter";
import {
    SubstationListContainer,
    SubstationListHeader,
    SubstationListItem,
    SubstationListWrapper,
    NewSubstationListItem,
    SubstationListBody,
    SubstationListTop,
    SubstationListBottom,
    SubstationListItemButton,
    SubstationListRow,
} from "./styled";
import { useNavigate, generatePath } from "react-router-dom";
import { ROLE_ADMIN, SUBSTATION_ROUTE } from "../../utils/constants";
import { Substation as SubstationModal } from "../modal";
import { DeleteLogo, EditLogo, PlusLogo } from "../common/images";
import { useSubList } from "../../context/subListProvider";
import { Tooltip } from "../common/styledTooltip/styledTooltip";
import { useAuth } from "../../context/authProvider";

const SubstationList = () => {
    const { subs } = useSubList();
    const { permission } = useAuth();
    const emptySub = { name: "", branch: "", description: "" };
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedSub, setSelectedSub] = useState(emptySub);
    // const [filter, setFilter] = useState({ sort: '', query: '' });
    const [filter, setFilter] = useState({ query: "" });
    const navigate = useNavigate();

    const sortedSearchedSub = useMemo(() => {
        const query = filter.query.toLowerCase();
        const filtered = subs.filter((s) =>
            s.name.toLowerCase().includes(query),
        );
        return filtered.sort((a, b) =>
            a.name.localeCompare(b.name, undefined, { numeric: true }),
        );
    }, [filter.query, subs]);

    const navigateToSubstation = (substation) => {
        const path = generatePath(SUBSTATION_ROUTE, {
            id: substation.id,
        });
        navigate(path);
    };

    const editSubstation = (current) => {
        setSelectedSub(current);
        setModalOpen(true);
    };

    const deleteSubstation = (substation) => {
        console.log("Delete");
        console.log(substation);
    };

    return (
        <>
            <SubstationListContainer $isModalOpen={isModalOpen}>
                <SubstationListWrapper>
                    <SubstationListTop>
                        <SubstationListHeader>
                            <h3>Список подстанций:</h3>
                        </SubstationListHeader>
                        <SubstationListFilter
                            filter={filter}
                            setFilter={setFilter}
                        />
                        {permission === ROLE_ADMIN && (
                            <NewSubstationListItem>
                                <button
                                    onClick={() => editSubstation(emptySub)}
                                >
                                    <p>Добавить новую подстанцию</p>
                                    <img
                                        src={PlusLogo}
                                        alt="add new substation"
                                    />
                                </button>
                            </NewSubstationListItem>
                        )}
                    </SubstationListTop>
                    <SubstationListBody>
                        {sortedSearchedSub.map((sub) => (
                            <SubstationListRow key={sub.id}>
                                <SubstationListItem
                                    onClick={() => navigateToSubstation(sub)}
                                >
                                    <Tooltip content={sub.description}>
                                        <p>
                                            {sub.name}, {sub.branch}
                                        </p>
                                    </Tooltip>
                                </SubstationListItem>
                                {permission === ROLE_ADMIN && (
                                    <>
                                        <SubstationListItemButton
                                            onClick={() => editSubstation(sub)}
                                        >
                                            <Tooltip content="Редактировать подстанцию">
                                                <img
                                                    src={EditLogo}
                                                    alt="Edit current substation"
                                                />
                                            </Tooltip>
                                        </SubstationListItemButton>
                                        <SubstationListItemButton
                                            onClick={() =>
                                                deleteSubstation(sub)
                                            }
                                        >
                                            <Tooltip content="Удалить подстанцию">
                                                <img
                                                    src={DeleteLogo}
                                                    alt="Delete current substation"
                                                />
                                            </Tooltip>
                                        </SubstationListItemButton>
                                    </>
                                )}
                            </SubstationListRow>
                        ))}
                    </SubstationListBody>
                    <SubstationListBottom></SubstationListBottom>
                </SubstationListWrapper>
            </SubstationListContainer>
            {isModalOpen && (
                <SubstationModal
                    onClose={() => setModalOpen(false)}
                    substation={selectedSub}
                />
            )}
        </>
    );
};

export default SubstationList;
