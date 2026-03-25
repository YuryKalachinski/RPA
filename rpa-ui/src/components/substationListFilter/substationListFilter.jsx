import { FilterContainer } from "./styled";

const SubstationListFilter = ({ filter, setFilter }) => {
    return (
        <FilterContainer>
            <input
                placeholder="Поиск..."
                value={filter.query}
                onChange={(e) =>
                    setFilter({ ...filter, query: e.target.value })
                }
            />
        </FilterContainer>
    );
};

export default SubstationListFilter;
