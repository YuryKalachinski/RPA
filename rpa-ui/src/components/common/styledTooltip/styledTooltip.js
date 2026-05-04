import { StyledTooltip } from "./styled";

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

export default Tooltip;
