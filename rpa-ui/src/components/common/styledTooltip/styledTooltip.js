import styled from "styled-components";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export const StyledTooltip = styled(Tippy)`
    background-color: var(--color-bg-medium);
    color: var(--color-text);
    font-size: 12px;
    border-radius: 8px;
    padding: 0 4px;

    .tippy-arrow {
        color: var(--color-bg-medium);
    }
`;

export const Tooltip = ({
    children,
    content,
    placement = "bottom",
    ...props
}) => {
    return (
        <StyledTooltip
            content={content}
            placement={placement}
            delay={[500, 0]}
            offset={[0, 0]}
            touch={false}
            arrow={false}
            {...props}
        >
            {children}
        </StyledTooltip>
    );
};
