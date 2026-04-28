import { useState } from "react";
import {
    ProtectionItemContainer,
    ProtectionItemWrapper,
    ProtectionItemBody,
    ProtectionItemTitle,
    SettingsButton,
    // ProtActionItemTitle,
} from "./styled";
import { MinusLogo, PlusLogo } from "../common/images/";
import { ParameterSettingsList } from "../parameterSettingsList";

const ProtectionItem = ({ prot }) => {
    const [visible, setVisible] = useState(false);

    const changeComplexForm = () => {
        setVisible((prevState) => !prevState);
    };

    return (
        <ProtectionItemContainer>
            <ProtectionItemWrapper>
                <ProtectionItemBody $visible={visible}>
                    <SettingsButton onClick={changeComplexForm}>
                        <img
                            src={visible ? MinusLogo : PlusLogo}
                            alt={visible ? "Collapse group" : "Expland group"}
                        />
                        <ProtectionItemTitle>{prot.name}</ProtectionItemTitle>
                    </SettingsButton>
                    {visible && (
                        <>
                            {prot.parameterSettings.length !== 0 && (
                                <ParameterSettingsList
                                    psl={prot.parameterSettings}
                                />
                            )}
                            {prot.children?.map((el) => (
                                <ProtectionItem key={el.id} prot={el} />
                            ))}
                        </>
                    )}

                    {/* <ProtActionItemTitle>{prot.protAction}</ProtActionItemTitle> */}
                </ProtectionItemBody>
            </ProtectionItemWrapper>
        </ProtectionItemContainer>
    );
};

export default ProtectionItem;
