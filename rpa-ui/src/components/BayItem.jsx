import { useNavigate, useParams, generatePath } from 'react-router-dom';
import React, { useState } from 'react';
import ComplexItem from './ComplexItem';
import { BAY_ROUTE } from '../utils/constants';

const BayItem = ({ bay }) => {
    const [visible, setVisible] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const viewBay = () => {
        const path = generatePath(BAY_ROUTE, {
            sub_id: id,
            bay_id: bay.id,
        });
        navigate(path);
    };

    return (
        <div>
            <div
                onClick={() => {
                    setVisible(!visible);
                }}
            >
                {bay.name}
            </div>
            {visible && (
                <div>
                    {bay.complexes.map((el) => (
                        <ComplexItem key={el.id} complex={el} bay_id={bay.id} />
                    ))}
                    <button onClick={() => viewBay()}>Уставки</button>
                </div>
            )}
        </div>
    );
};

export default BayItem;
