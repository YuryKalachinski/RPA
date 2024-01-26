// import { useNavigate } from 'react-router-dom';
// import { SUBSTATION_ROUTE } from '../utils/constants';

const ComplexItem = ({ complex }) => {
    // const navigate = useNavigate();

    return (
        <div>
            <div>
                {complex.name} {complex.description}
            </div>
        </div>
    );
};

export default ComplexItem;
