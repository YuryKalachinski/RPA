import React, { useState } from 'react';
import ComplexItem from './ComplexItem';

const BayItem = ({ bay }) => {
    const [visible, setVisible] = useState(false);
    // console.log(bay);
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
                        <ComplexItem key={el.id} complex={el} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BayItem;
