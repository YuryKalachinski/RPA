import { useMemo, useState } from "react";
import {
    ProtectionItemContainer,
    ProtectionItemWrapper,
    ProtectionItemBody,
    ProtectionItemTitle,
    SettingsButton,
    SettingsRow,
    SettingsEdit,
} from "./styled";
import {
    DocumentPlusLogo,
    EditLogo,
    FolderPlusLogo,
    MinusLogo,
    PlusLogo,
} from "../../common/images/";
import ParameterList from "./parameterList";
import { Tooltip } from "../../common/styledTooltip/styledTooltip";
import { sortFromDictionary } from "../../../utils/methods";
import { useUtility } from "../../../context/utilityProvider";

const ProtectionItem = ({ protection, index, pathArray, openModal }) => {
    const [visible, setVisible] = useState(false);
    const emptyProtection = {
        id: null,
        name: "",
        description: "",
        isRoot: false,
        parent: null,
        protAction: "NONE",
        complex: {
            id: protection?.complex?.id,
            name: protection?.complex?.name,
        },
        children: [],
        parameterSettings: [],
        isDeleted: false,
    };
    const emptyParameter = {
        id: null,
        comment: "",
        description: "",
        key: "",
        value: "",
        unit: "",
        protection: {
            id: protection?.id,
            name: protection?.name,
        },
        isDeleted: false,
    };
    const { protectionDictionary } = useUtility();

    const sortedChildren = useMemo(() => {
        if (!protection?.children) return [];
        return [...protection?.children].sort((a, b) => {
            return sortFromDictionary(a.name, b.name, protectionDictionary);
        });
    }, [protection, protectionDictionary]);

    const changeComplexForm = () => {
        setVisible((prevState) => !prevState);
    };

    return (
        <ProtectionItemContainer>
            <ProtectionItemWrapper>
                <ProtectionItemBody $visible={visible}>
                    <SettingsRow>
                        <SettingsButton onClick={changeComplexForm}>
                            <Tooltip content={protection?.description}>
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
                                        {protection.name}
                                    </ProtectionItemTitle>
                                </div>
                            </Tooltip>
                        </SettingsButton>
                        <SettingsEdit>
                            {visible && (
                                <>
                                    <Tooltip content="Добавить уставку">
                                        <img
                                            src={DocumentPlusLogo}
                                            alt="Add parameter setting"
                                            onClick={() =>
                                                openModal(
                                                    emptyParameter,
                                                    [
                                                        ...pathArray,
                                                        index,
                                                        "parameterSettings",
                                                    ],
                                                    protection.parameterSettings
                                                        .length,
                                                    "param",
                                                )
                                            }
                                        />
                                    </Tooltip>
                                    <Tooltip content="Добавить защиту">
                                        <img
                                            src={FolderPlusLogo}
                                            alt="Add protection folder"
                                            onClick={() =>
                                                openModal(
                                                    emptyProtection,
                                                    [
                                                        ...pathArray,
                                                        index,
                                                        "children",
                                                    ],
                                                    protection.children.length,
                                                    "prot",
                                                )
                                            }
                                        />
                                    </Tooltip>
                                    <Tooltip content="Редактировать защиту">
                                        <img
                                            src={EditLogo}
                                            alt="Edit protection folder"
                                            onClick={() =>
                                                openModal(
                                                    protection,
                                                    pathArray,
                                                    index,
                                                    "prot",
                                                )
                                            }
                                        />
                                    </Tooltip>
                                </>
                            )}
                        </SettingsEdit>
                    </SettingsRow>
                    {visible && (
                        <>
                            {protection.parameterSettings.length > 0 && (
                                <ParameterList
                                    psl={protection.parameterSettings}
                                    pathArray={[
                                        ...pathArray,
                                        index,
                                        "parameterSettings",
                                    ]}
                                    openModal={openModal}
                                />
                            )}
                            {sortedChildren.map((el, elIndx) => (
                                <ProtectionItem
                                    key={elIndx}
                                    protection={el}
                                    index={protection.children.indexOf(el)}
                                    pathArray={[
                                        ...pathArray,
                                        index,
                                        "children",
                                    ]}
                                    openModal={openModal}
                                />
                            ))}
                        </>
                    )}
                </ProtectionItemBody>
            </ProtectionItemWrapper>
        </ProtectionItemContainer>
    );
};

export default ProtectionItem;
