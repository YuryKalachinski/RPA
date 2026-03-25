import { useState } from "react";
import {
    ComplexItemBody,
    ComplexItemConteiner,
    ComplexItemTitle,
    ComplexItemType,
    ComplexItemWrapper,
    SettingsButton,
} from "./styled";
import minus from "./images/minus.svg";
import plus from "./images/plus.svg";
import ProtectionItem from "../protectionItem/protectionItem";

const ComplexItem = ({ complex }) => {
    const [visible, setVisible] = useState(false);

    const changeComplexForm = () => {
        setVisible((prevState) => !prevState);
    };

    return (
        <ComplexItemConteiner>
            <ComplexItemWrapper>
                <ComplexItemBody>
                    <ComplexItemTitle>{complex.name}</ComplexItemTitle>
                    <ComplexItemType>{complex.description}</ComplexItemType>
                    {visible ? (
                        <>
                            <SettingsButton onClick={changeComplexForm}>
                                <img src={minus} alt="Collapse group" />
                                <p>Уставки</p>
                            </SettingsButton>
                            {complex.protections.map((prot) => (
                                <ProtectionItem key={prot.id} prot={prot} />
                            ))}
                        </>
                    ) : (
                        <>
                            <SettingsButton onClick={changeComplexForm}>
                                <img src={plus} alt="Expland group" />
                                <p>Уставки</p>
                            </SettingsButton>
                        </>
                    )}
                </ComplexItemBody>
            </ComplexItemWrapper>
        </ComplexItemConteiner>
    );
};

export default ComplexItem;
