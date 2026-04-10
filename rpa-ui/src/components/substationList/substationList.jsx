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
import { SUBSTATION_ROUTE } from "../../utils/constants";
import { Substation as SubstationModal } from "../modal";
import { DeleteLogo, EditLogo, PlusLogo } from "../common/images";
import { useSubList } from "../../context/subListProvider";

const SubstationList = () => {
    const { subs } = useSubList();
    const emptySub = { name: "", branch: "", description: "" };
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedSub, setSelectedSub] = useState(emptySub);
    // const [filter, setFilter] = useState({ sort: '', query: '' });
    const [filter, setFilter] = useState({ query: "" });
    const navigate = useNavigate();

    const searchedSub = useMemo(() => {
        return subs.filter((s) =>
            s.name.toLowerCase().includes(filter.query.toLowerCase()),
        );
    }, [filter.query, subs]);

    const sortedSearchedSub = useMemo(() => {
        return [...searchedSub].sort((a, b) => a.name.localeCompare(b.name));
    }, [searchedSub]);

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
            <SubstationListContainer>
                <SubstationListWrapper>
                    <SubstationListTop>
                        <SubstationListHeader>
                            <h3>Список подстанций:</h3>
                        </SubstationListHeader>
                        <SubstationListFilter
                            filter={filter}
                            setFilter={setFilter}
                        />
                        <NewSubstationListItem>
                            <button onClick={() => editSubstation(emptySub)}>
                                <p>Добавить новую подстанцию</p>
                                <img src={PlusLogo} alt="add new substation" />
                            </button>
                        </NewSubstationListItem>
                    </SubstationListTop>
                    <SubstationListBody>
                        {sortedSearchedSub.map((sub) => (
                            <SubstationListRow key={sub.id}>
                                <SubstationListItem
                                    onClick={() => navigateToSubstation(sub)}
                                >
                                    <p>{sub.name},</p> <p>{sub.branch}</p>
                                </SubstationListItem>
                                <SubstationListItemButton
                                    onClick={() => editSubstation(sub)}
                                >
                                    <img
                                        src={EditLogo}
                                        alt="Edit current substation"
                                    />
                                </SubstationListItemButton>
                                <SubstationListItemButton
                                    onClick={() => deleteSubstation(sub)}
                                >
                                    <img
                                        src={DeleteLogo}
                                        alt="Delete current substation"
                                    />
                                </SubstationListItemButton>
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
