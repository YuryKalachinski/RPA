import { useEffect, useState, useMemo } from "react";
import SubstationListFilter from "../substationListFilter/substationListFilter";
import { getAllSubstations } from "../../http/substationAPI";
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

const SubstationList = () => {
    const [subs, setSubs] = useState([]);
    const [visibleNewSub, setVisibleNewSub] = useState(false);
    // const [filter, setFilter] = useState({ sort: '', query: '' });
    const [filter, setFilter] = useState({ query: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const getSubstations = async () => {
            try {
                const response = await getAllSubstations();
                setSubs(response.data);
            } catch (e) {
                alert(e.response.data.message);
            }
        };
        getSubstations();
    }, []);

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
        <SubstationListContainer>
            <SubstationListWrapper>
                <SubstationListHeader>
                    <h3>Список подстанций:</h3>
                </SubstationListHeader>
                <SubstationListFilter filter={filter} setFilter={setFilter} />
                <SubstationListItem>
                    <button onClick={() => setVisibleNewSub(true)}>
                        <p>Добавить новую подстанцию</p>
                        <img src={plus} alt="Expland group" />
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
            <NewSubstation
                isOpen={visibleNewSub}
                onClose={() => setVisibleNewSub(false)}
            />
        </SubstationListContainer>
    );
};

export default SubstationList;
