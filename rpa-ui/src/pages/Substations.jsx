import { SubstationList } from "../components/substationList";
import { SubListProvider } from "../context";

const Substations = () => {
    return (
        <SubListProvider>
            <SubstationList />
        </SubListProvider>
    );
};

export default Substations;
