import { useState } from "react";
import {
    TemplateGroupContainer,
    TemplateListBody,
    TemplateListItem,
    TemplateGroupWrapper,
    TemplateItem,
} from "./styled";
import { MinusLogo, PlusLogo } from "../common/images/";
import Tooltip from "../common/styledTooltip/styledTooltip";

const TemplateGroup = ({
    manufacturer,
    temps,
    selectTemplate,
    selectedTemplate,
}) => {
    const [visible, setVisible] = useState(false);

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
                                <TemplateItem
                                    key={itemIndx}
                                    $isActive={temp === selectedTemplate}
                                    onClick={() => selectTemplate(temp)}
                                >
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
