import { useNavigate } from "react-router-dom";
import {
    BayItemBottom,
    BayItemContainer,
    BayItemHeader,
    BayItemTop,
    BayItemWrapper,
    ComplexList,
} from "./styled";
import ComplexItem from "../complexItem/complexItem";
import { useBay } from "../../context/bayProvider";

const BayItem = () => {
    const { bay } = useBay();
    const navigate = useNavigate();

    return (
        <BayItemContainer>
            <BayItemWrapper>
                <BayItemTop>
                    <BayItemHeader>
                        <h3>{bay?.substation?.name}</h3>
                        <p>{bay?.name}:</p>
                    </BayItemHeader>
                    <ComplexList>
                        {bay.complexes.map((el) => (
                            <ComplexItem key={el.id} complex={el} />
                        ))}
                    </ComplexList>
                </BayItemTop>
                <BayItemBottom>
                    <hr />
                    <button
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Назад
                    </button>
                </BayItemBottom>
            </BayItemWrapper>
        </BayItemContainer>
    );
};

export default BayItem;
