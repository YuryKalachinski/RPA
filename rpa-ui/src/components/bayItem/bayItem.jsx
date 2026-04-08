import { useNavigate } from "react-router-dom";
import {
    BayItemBody,
    BayItemBottom,
    BayItemContainer,
    BayItemHeader,
    BayItemTop,
    BayItemWrapper,
    NewComplexItem,
} from "./styled";
import { ComplexItem } from "../complexItem";
import { useBay } from "../../context/bayProvider";
import { useState } from "react";
import { PlusLogo } from "../common/images";
import { NewComplex } from "../modal";

const BayItem = () => {
    const { bay } = useBay();
    const navigate = useNavigate();
    const [isNewComplexOpen, setNewComplexOpen] = useState(false);

    return (
        <>
            <BayItemContainer>
                <BayItemWrapper>
                    <BayItemTop>
                        <BayItemHeader>
                            <h3>{bay?.substation?.name}</h3>
                            <p>{bay?.name}:</p>
                        </BayItemHeader>
                    </BayItemTop>
                    <BayItemBody>
                        {bay.complexes.map((el) => (
                            <ComplexItem key={el.id} complex={el} />
                        ))}
                        <NewComplexItem onClick={() => setNewComplexOpen(true)}>
                            <img src={PlusLogo} alt="add new bay" />
                        </NewComplexItem>
                    </BayItemBody>
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
            {isNewComplexOpen && (
                <NewComplex onClose={() => setNewComplexOpen(false)} />
            )}
        </>
    );
};

export default BayItem;
