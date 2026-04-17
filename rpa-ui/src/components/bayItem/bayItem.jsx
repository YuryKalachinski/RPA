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
import { useMemo, useState } from "react";
import { PlusLogo } from "../common/images";
import { Complex as ComplexModal } from "../modal";

const BayItem = () => {
    const { bay } = useBay();
    const emptyComplex = {
        name: "",
        description: "",
        bay: { id: bay.id, name: bay.name },
        protections: [],
    };
    const [selectedComplex, setSelectedComplex] = useState(emptyComplex);
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const sortedComplexes = useMemo(() => {
        return [...bay.complexes].sort((a, b) => a.name.localeCompare(b.name));
    }, [bay]);

    const editComplex = (complex) => {
        setSelectedComplex(complex);
        setModalOpen(true);
    };

    return (
        <>
            <BayItemContainer>
                <BayItemWrapper>
                    <BayItemTop>
                        <BayItemHeader>
                            <h3>{bay?.substation?.name}</h3>
                            <p>
                                {bay?.name} {bay?.description} :
                            </p>
                        </BayItemHeader>
                    </BayItemTop>
                    <BayItemBody>
                        {sortedComplexes.map((el) => (
                            <ComplexItem
                                key={el.id}
                                complex={el}
                                editComplex={() => editComplex(el)}
                            />
                        ))}
                        <NewComplexItem
                            onClick={() => editComplex(emptyComplex)}
                        >
                            <img src={PlusLogo} alt="add new complex" />
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
            {isModalOpen && (
                <ComplexModal
                    onClose={() => setModalOpen(false)}
                    complex={selectedComplex}
                />
            )}
        </>
    );
};

export default BayItem;
