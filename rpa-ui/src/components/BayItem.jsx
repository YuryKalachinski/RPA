import { useNavigate, useParams, generatePath } from 'react-router-dom';
import React, { useState } from 'react';
import ComplexItem from './ComplexItem';
import { BAY_ROUTE } from '../utils/constants';

const BayItem = ({ bay }) => {
    const [visible, setVisible] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const navigateToBay = () => {
        const path = generatePath(BAY_ROUTE, {
            sub_id: id,
            bay_id: bay.id,
        });
        navigate(path);
    };

    const setVisibleBay = () => {
        setVisible(!visible);
    };

    return (
        <div>
            <h3 onClick={setVisibleBay}>{bay.name}</h3>
            {visible && (
                <div>
                    {bay.complexes.map((el) => (
                        <ComplexItem key={el.id} complex={el} bay_id={bay.id} />
                    ))}
                    <button onClick={navigateToBay}>Уставки</button>
                </div>
            )}
        </div>
    );
};

export default BayItem;
