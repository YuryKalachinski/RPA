import { StyledButton } from "./styled";

const Button = ({ onClick, children, variant = "primary" }) => {
    return (
        <StyledButton onClick={onClick} $variant={variant}>
            {children}
        </StyledButton>
    );
};

export default Button;
