import React, { useEffect, useState } from 'react';
import { getSubstationById } from '../http/substationAPI';
import { useParams, useNavigate } from 'react-router-dom';
import BayItem from '../components/BayItem';

const Substation = () => {
    const { id } = useParams();
    const [sub, setSub] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getSubstation(id);
    }, [id]);

    const getSubstation = async (subId) => {
        try {
            const response = await getSubstationById(subId);
            setSub(response.data);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <div>
            {sub && (
                <div>
                    <div>Подстанция: {sub.name}</div>
                    <div>
                        Присоединения:
                        {sub.bays.map((el) => (
                            <BayItem key={el.id} bay={el} />
                        ))}
                    </div>
                </div>
            )}
            <hr />
            <div
                onClick={() => {
                    navigate(-1);
                }}
            >
                Назад
            </div>
        </div>
    );
};

export default Substation;
