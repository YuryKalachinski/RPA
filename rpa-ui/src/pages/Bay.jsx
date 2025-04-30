import React, { useEffect, useState } from 'react';
import { getSubstationBySubstationIdAndBayId } from '../http/substationAPI';
import { useParams, useNavigate } from 'react-router-dom';

const Bay = () => {
    const { sub_id, bay_id } = useParams();
    const [sub, setSub] = useState(null);
    const [complexes, setComplexes] = useState([]);
    const [currentComplex, setCurrentComplex] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getSubstation(sub_id, bay_id);
    }, [sub_id, bay_id]);

    const getSubstation = async (sub_id, bay_id) => {
        try {
            const response = await getSubstationBySubstationIdAndBayId(
                sub_id,
                bay_id
            );
            setSub(response.data);
            setComplexes(response.data.bays[0].complexes);
            setCurrentComplex(response.data.bays[0].complexes[0]);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <div>
            <p>{sub?.name}</p>
            <p>{sub?.bays[0]?.name}</p>
            <div>
                {complexes.map((el) => {
                    return (
                        <button
                            key={el.id}
                            onClick={() => setCurrentComplex(el)}
                        >
                            {el.name}
                        </button>
                    );
                })}
            </div>
            {currentComplex && (
                <div>
                    <p>Уставки {currentComplex.name}:</p>
                    {currentComplex.protections.map((el) => (
                        <div key={el.id}>
                            <p>
                                {el.name} {el.protectionAction}
                            </p>
                            <div>
                                {el.parameterSettings.map((sub_el) => (
                                    <p key={sub_el.id}>
                                        {sub_el.key} {sub_el.value}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
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

export default Bay;
