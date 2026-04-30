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

const ProtectionItem = ({ prot }) => {
    const [visible, setVisible] = useState(false);

    const sortedChildren = useMemo(() => {
        return [...prot.children].sort((a, b) => a.name.localeCompare(b.name));
    }, [prot]);

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
