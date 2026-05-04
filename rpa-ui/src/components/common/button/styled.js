import styled from "styled-components";

export const StyledButton = styled.button`
    background-color: ${({ $variant }) => {
        switch ($variant) {
            case "delete":
                return "var(--color-alarm)";
            case "back":
                return "var(--color-secondary)";
            case "close":
                return "var(--color-stroke)";
            default:
                return "var(--color-primary)";
        }
    }};
    color: var(--color-text);
    border: none;
    border-radius: 10px;
    padding: 12px 24px;
    font-size: 18px;
    line-height: 120%;
    text-align: center;
    width: 100%;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }

    &:active {
        transform: scale(0.98);
    }
`;
