import { useMemo, useState } from "react";
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
import { Tooltip } from "../common/styledTooltip/styledTooltip";
import { useUtility } from "../../context/utilityProvider";
import { sortFromDictionary } from "../../utils/methods";

const ProtectionItem = ({ prot }) => {
    const [visible, setVisible] = useState(false);
    const { protectionDictionary } = useUtility();

    const sortedChildren = useMemo(() => {
        if (!prot?.children) return [];
        return [...prot?.children].sort((a, b) => {
            return sortFromDictionary(a.name, b.name, protectionDictionary);
        });
    }, [prot?.children, protectionDictionary]);

    const changeComplexForm = () => {
        setVisible((prevState) => !prevState);
    };

    return (
        <ProtectionItemContainer>
            <ProtectionItemWrapper>
                <ProtectionItemBody $visible={visible}>
                    <SettingsButton onClick={changeComplexForm}>
                        <Tooltip content={prot.description}>
                            <div>
                                <img
                                    src={visible ? MinusLogo : PlusLogo}
                                    alt={
                                        visible
                                            ? "Collapse group"
                                            : "Expland group"
                                    }
                                />
                                <ProtectionItemTitle>
                                    {prot.name}
                                </ProtectionItemTitle>
                            </div>
                        </Tooltip>
                    </SettingsButton>
                    {visible && (
                        <>
                            {prot.parameterSettings.length !== 0 && (
                                <ParameterSettingsList
                                    psl={prot.parameterSettings}
                                />
                            )}
                            {sortedChildren?.map((el, elIndx) => (
                                <ProtectionItem key={elIndx} prot={el} />
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
