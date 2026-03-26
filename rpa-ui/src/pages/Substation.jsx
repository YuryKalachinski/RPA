import SubstationItem from "../components/substationItem/substationItem";
import SubProvider from "../context/subProvider";

const Substation = () => {
    return (
        <SubProvider>
            <SubstationItem />;
        </SubProvider>
    );
};

export default Substation;
