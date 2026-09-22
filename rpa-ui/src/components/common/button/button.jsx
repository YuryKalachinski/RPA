import { StyledButton } from "./styled";

const Button = ({ onClick, children, variant = "primary", ...props }) => {
    return (
        <StyledButton onClick={onClick} $variant={variant} {...props}>
            {children}
        </StyledButton>
    );
};

export default Button;
