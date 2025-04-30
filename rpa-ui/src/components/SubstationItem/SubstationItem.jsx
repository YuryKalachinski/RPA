import { useNavigate, generatePath } from 'react-router-dom';
import { SUBSTATION_ROUTE } from '../../utils/constants';
import './SubstationItem.css';

const SubstationItem = ({ substation }) => {
    const navigate = useNavigate();
    const navigateToBay = () => {
        const path = generatePath(SUBSTATION_ROUTE, {
            id: substation.id,
        });
        navigate(path);
    };

    return (
        <div>
            <div className="sub__item" onClick={navigateToBay}>
                {substation.name}
            </div>
        </div>
    );
};

export default SubstationItem;
