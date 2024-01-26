import { useNavigate, generatePath } from 'react-router-dom';
import { SUBSTATION_ROUTE } from '../utils/constants';

const SubstationItem = ({ substation }) => {
    const navigate = useNavigate();

    return (
        <div>
            <div
                onClick={() => {
                    const path = generatePath(SUBSTATION_ROUTE, {
                        id: substation.id,
                    });
                    navigate(path);
                }}
            >
                {substation.name}
            </div>
        </div>
    );
};

export default SubstationItem;
