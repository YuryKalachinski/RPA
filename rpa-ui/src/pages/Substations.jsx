import React, { useEffect, useState, useMemo } from 'react';
import { getAllSubstations } from '../http/substationAPI';
import SubstationItem from '../components/SubstationItem/SubstationItem';
import SubstationsFilter from '../components/SubstationsFilter';

const Substations = () => {
    const [subs, setSubs] = useState([]);
    // const [filter, setFilter] = useState({ sort: '', query: '' });
    const [filter, setFilter] = useState({ query: '' });

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
            s.name.toLowerCase().includes(filter.query.toLowerCase())
        );
    }, [filter.query, subs]);

    return (
        <div>
            <h1>Подстанции:</h1>
            <SubstationsFilter filter={filter} setFilter={setFilter} />
            <hr />
            {searchedSub.map((el) => (
                <SubstationItem key={el.id} substation={el} />
            ))}
        </div>
    );
};

export default Substations;
