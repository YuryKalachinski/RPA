import BayItem from "../components/bayItem/bayItem";
import BayProvider from "../context/bayProvider";

const Bay = () => {
    return (
        <BayProvider>
            <BayItem />
        </BayProvider>
    );
};

export default Bay;
