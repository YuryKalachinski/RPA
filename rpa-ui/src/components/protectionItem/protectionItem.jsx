import { useState } from "react";
import {
    ProtectionItemConteiner,
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
        <ProtectionItemConteiner>
            <ProtectionItemWrapper>
                <ProtectionItemBody>
                    <SettingsButton onClick={changeComplexForm}>
                        <img
                            src={visible ? MinusLogo : PlusLogo}
                            alt={visible ? "Collapse group" : "Expland group"}
                        />
                        <ProtectionItemTitle>{prot.name}</ProtectionItemTitle>
                    </SettingsButton>
                    {visible && (
                        <>
                            {prot.children?.map((el) => (
                                <ProtectionItem key={el.id} prot={el} />
                            ))}
                            <ParameterSettingsList
                                psl={prot.parameterSettings}
                            />
                        </>
                    )}
                    {/* <ProtActionItemTitle>{prot.protAction}</ProtActionItemTitle> */}
                </ProtectionItemBody>
            </ProtectionItemWrapper>
        </ProtectionItemConteiner>
    );
};

export default ProtectionItem;
