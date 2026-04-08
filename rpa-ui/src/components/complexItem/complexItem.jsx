import { useState } from "react";
import {
    ComplexItemBody,
    ComplexItemConteiner,
    ComplexItemTitle,
    ComplexItemType,
    ComplexItemWrapper,
    SettingsButton,
} from "./styled";
import { MinusLogo, PlusLogo } from "../common/images/";
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
                    <SettingsButton onClick={changeComplexForm}>
                        <img
                            src={visible ? MinusLogo : PlusLogo}
                            alt={visible ? "Collapse group" : "Expland group"}
                        />
                        <p>Уставки</p>
                    </SettingsButton>
                    {visible && (
                        <>
                            {complex.protections?.map((prot) => (
                                <ProtectionItem key={prot.id} prot={prot} />
                            ))}
                        </>
                    )}
                </ComplexItemBody>
            </ComplexItemWrapper>
        </ComplexItemConteiner>
    );
};

export default ComplexItem;
