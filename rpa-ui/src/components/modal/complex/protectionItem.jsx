import { useState } from "react";
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

    const changeComplexForm = () => {
        setVisible((prevState) => !prevState);
    };

    return (
        <ProtectionItemContainer>
            <ProtectionItemWrapper>
                <ProtectionItemBody $visible={visible}>
                    <SettingsRow>
                        <SettingsButton onClick={changeComplexForm}>
                            <img
                                src={visible ? MinusLogo : PlusLogo}
                                alt={
                                    visible ? "Collapse group" : "Expland group"
                                }
                            />
                            <ProtectionItemTitle>
                                {protection.name}
                            </ProtectionItemTitle>
                        </SettingsButton>
                        <SettingsEdit>
                            {visible && (
                                <>
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
                            {protection.children?.map((el, elIndx) => (
                                <ProtectionItem
                                    key={el.id + el.name}
                                    protection={el}
                                    index={elIndx}
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
