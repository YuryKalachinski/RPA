import React, { useEffect, useState } from 'react';
import { getAllSubstations } from '../http/substationAPI';
import SubstationItem from '../components/SubstationItem';

const Substations = () => {
    const [subs, setSubs] = useState([]);

    useEffect(() => {
        getSubstations();
    }, []);

    const getSubstations = async () => {
        try {
            const response = await getAllSubstations();
            setSubs(response.data);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <div>
            <div>Substations:</div>
            {subs.map((el) => (
                <SubstationItem key={el.id} substation={el} />
            ))}
        </div>
    );
};

export default Substations;
