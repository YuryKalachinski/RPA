import { useState } from "react";
import {
    ComplexItemBody,
    ComplexItemConteiner,
    ComplexItemEdit,
    ComplexItemTitle,
    ComplexItemType,
    ComplexItemWrapper,
    SettingsButton,
} from "./styled";
import { EditLogo, MinusLogo, PlusLogo } from "../common/images/";
import ProtectionItem from "../protectionItem/protectionItem";

const ComplexItem = ({ complex, editComplex }) => {
    const [visible, setVisible] = useState(false);

    const changeComplexForm = () => {
        setVisible((prevState) => !prevState);
    };

    return (
        <ComplexItemConteiner>
            <ComplexItemWrapper>
                <ComplexItemBody>
                    <ComplexItemTitle>
                        {complex.name}
                        <ComplexItemEdit onClick={editComplex}>
                            <img
                                src={EditLogo}
                                alt="Edit parameters of complex"
                            />
                        </ComplexItemEdit>
                    </ComplexItemTitle>
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
