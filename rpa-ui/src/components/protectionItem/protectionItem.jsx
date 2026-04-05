import { useState } from "react";
import {
    ProtectionItemConteiner,
    ProtectionItemWrapper,
    ProtectionItemBody,
    ProtectionItemTitle,
    SettingsButton,
    // ProtActionItemTitle,
} from "./styled";
import minus from "./images/minus.svg";
import plus from "./images/plus.svg";
import ParameterSettingsList from "../parameterSettingsList/parameterSettingsList";

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
                            src={visible ? minus : plus}
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
