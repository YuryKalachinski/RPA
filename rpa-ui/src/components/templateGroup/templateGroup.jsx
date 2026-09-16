import { useState } from "react";
import {
    TemplateGroupContainer,
    TemplateListBody,
    TemplateListItem,
    TemplateGroupWrapper,
    TemplateItem,
} from "./styled";
import { MinusLogo, PlusLogo } from "../common/images/";
// import { useAuth } from "../../context/authProvider";
import Tooltip from "../common/styledTooltip/styledTooltip";

const TemplateGroup = ({ manufacturer, temps }) => {
    const [visible, setVisible] = useState(false);
    // const { permission } = useAuth();

    const changeGroupForm = () => {
        setVisible((prevState) => !prevState);
    };

    return (
        <TemplateGroupContainer>
            <TemplateGroupWrapper>
                <TemplateListBody>
                    <TemplateListItem onClick={changeGroupForm}>
                        <Tooltip
                            content={
                                visible
                                    ? "Свернуть список"
                                    : "Развернуть список"
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
                                <p>{manufacturer}</p>
                            </div>
                        </Tooltip>
                    </TemplateListItem>
                    {visible && (
                        <>
                            {temps.map((temp, itemIndx) => (
                                <TemplateItem key={itemIndx}>
                                    {temp.name}
                                </TemplateItem>
                            ))}
                        </>
                    )}
                </TemplateListBody>
            </TemplateGroupWrapper>
        </TemplateGroupContainer>
    );
};

export default TemplateGroup;
