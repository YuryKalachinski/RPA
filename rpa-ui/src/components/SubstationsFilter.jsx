import React from 'react';

const SubstationsFilter = ({ filter, setFilter }) => {
    return (
        <div>
            <input
                placeholder="Поиск..."
                value={filter.query}
                onChange={(e) =>
                    setFilter({ ...filter, query: e.target.value })
                }
            />
        </div>
    );
};

export default SubstationsFilter;
