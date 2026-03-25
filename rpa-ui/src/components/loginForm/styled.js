import styled from "styled-components";

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const LoginCard = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--color-bg-medium);
    border-radius: 20px;
    margin: 48px 0;
    width: 100%;
    max-width: 480px;
`;

export const LoginHeader = styled.div`
    padding: 24px;
    & h3 {
        color: var(--color-text);
        font-size: 36px;
        font-weight: 700;
        text-align: center;
        cursor: default;
    }

    & p {
        color: var(--color-text);
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        cursor: default;
    }
`;

export const LoginFormGroup = styled.div`
    padding: 0 48px;
    & button {
        background-color: var(--color-primary);
        color: var(--color-text);
        border: none;
        border-radius: 10px;
        padding: 12px 24px;
        font-size: 18px;
        line-height: 120%;
        text-align: center;
        width: 100%;
        cursor: pointer;
    }
`;

export const SignUpLink = styled.div`
    & p {
        color: var(--color-text);
        font-size: 14px;
        text-align: center;
        margin: 24px 0;
    }

    & button {
        background: transparent;
        color: var(--color-primary);
        border: none;
        outline: none;
        padding: 12px 12px;
        font-size: 14px;
        font-weight: 700;
        text-align: center;
        cursor: pointer;
    }
`;
