import { useState, useMemo } from "react";
import SubstationListFilter from "../substationListFilter/substationListFilter";
import {
    SubstationListContainer,
    SubstationListHeader,
    SubstationListItem,
    SubstationListWrapper,
} from "./styled";
import { useNavigate, generatePath } from "react-router-dom";
import { SUBSTATION_ROUTE } from "../../utils/constants";
import NewSubstation from "../modal/newSubstation/newSubstation";
import plus from "./images/plus.svg";
import { useSubList } from "../../context/subListProvider";

const SubstationList = () => {
    const { subs } = useSubList();
    const [isNewSubOpen, setNewSubOpen] = useState(false);
    // const [filter, setFilter] = useState({ sort: '', query: '' });
    const [filter, setFilter] = useState({ query: "" });
    const navigate = useNavigate();

    const searchedSub = useMemo(() => {
        return subs.filter((s) =>
            s.name.toLowerCase().includes(filter.query.toLowerCase()),
        );
    }, [filter.query, subs]);

    const navigateToSubstation = (substation) => {
        const path = generatePath(SUBSTATION_ROUTE, {
            id: substation.id,
        });
        navigate(path);
    };

    return (
        <>
            <SubstationListContainer>
                <SubstationListWrapper>
                    <SubstationListHeader>
                        <h3>Список подстанций:</h3>
                    </SubstationListHeader>
                    <SubstationListFilter
                        filter={filter}
                        setFilter={setFilter}
                    />
                    <SubstationListItem>
                        <button onClick={() => setNewSubOpen(true)}>
                            <p>Добавить новую подстанцию</p>
                            <img src={plus} alt="add new substation" />
                        </button>
                    </SubstationListItem>
                    {searchedSub.map((sub) => (
                        <SubstationListItem key={sub.id}>
                            <button onClick={() => navigateToSubstation(sub)}>
                                {sub.name}
                            </button>
                        </SubstationListItem>
                    ))}
                </SubstationListWrapper>
            </SubstationListContainer>
            <NewSubstation
                isOpen={isNewSubOpen}
                onClose={() => setNewSubOpen(false)}
            />
        </>
    );
};

export default SubstationList;
