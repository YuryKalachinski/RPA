import { useMemo, useState } from "react";
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
import { ProtectionItem } from "../protectionItem";
import { Tooltip } from "../common/styledTooltip/styledTooltip";
import { useAuth } from "../../context/authProvider";
import { ROLE_ADMIN } from "../../utils/constants";
import { useUtility } from "../../context/utilityProvider";
import { sortFromDictionary } from "../../utils/methods";

const ComplexItem = ({ complex, editComplex }) => {
    const [visible, setVisible] = useState(false);
    const { permission } = useAuth();
    const { protectionDictionary } = useUtility();

    const sortedProtections = useMemo(() => {
        if (!complex?.protections) return [];
        return [...complex?.protections].sort((a, b) => {
            return sortFromDictionary(a.name, b.name, protectionDictionary);
        });
    }, [complex?.protections, protectionDictionary]);

    const changeComplexForm = () => {
        setVisible((prevState) => !prevState);
    };

    return (
        <ComplexItemConteiner>
            <ComplexItemWrapper>
                <ComplexItemBody>
                    <ComplexItemTitle>
                        {complex.name}
                        {permission === ROLE_ADMIN && (
                            <ComplexItemEdit onClick={editComplex}>
                                <Tooltip content="Редактирование комплекса">
                                    <img
                                        src={EditLogo}
                                        alt="Edit parameters of complex"
                                    />
                                </Tooltip>
                            </ComplexItemEdit>
                        )}
                    </ComplexItemTitle>
                    <ComplexItemType>{complex.description}</ComplexItemType>
                    <SettingsButton onClick={changeComplexForm}>
                        <Tooltip
                            content={
                                visible ? "Скрыть уставки" : "Показать уставки"
                            }
                        >
                            <div>
                                <img
                                    src={visible ? MinusLogo : PlusLogo}
                                    alt={
                                        visible
                                            ? "Collapse group"
                                            : "Expand group"
                                    }
                                />
                                <p>Уставки</p>
                            </div>
                        </Tooltip>
                    </SettingsButton>
                    {visible && (
                        <>
                            {sortedProtections.map((prot, protIndx) => (
                                <ProtectionItem key={protIndx} prot={prot} />
                            ))}
                        </>
                    )}
                </ComplexItemBody>
            </ComplexItemWrapper>
        </ComplexItemConteiner>
    );
};

export default ComplexItem;
