import SubstationList from "../components/substationList/substationList";
import SubListProvider from "../context/subListProvider";

const Substations = () => {
    return (
        <SubListProvider>
            <SubstationList />
        </SubListProvider>
    );
};

export default Substations;
