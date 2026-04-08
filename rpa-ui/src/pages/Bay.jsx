import { BayItem } from "../components/bayItem";
import { BayProvider } from "../context";

const Bay = () => {
    return (
        <BayProvider>
            <BayItem />
        </BayProvider>
    );
};

export default Bay;
