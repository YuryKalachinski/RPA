import { SubstationItem } from "../components/substationItem";
import { SubProvider } from "../context";

const Substation = () => {
    return (
        <SubProvider>
            <SubstationItem />
        </SubProvider>
    );
};

export default Substation;
