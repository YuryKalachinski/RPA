import styled from "styled-components";

export const ComplexContainer = styled.div`
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ComplexWrapper = styled.div`
    background-color: var(--color-bg-medium);
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid var(--color-bg);
    border-radius: 20px;
    margin: 24px 0;
    width: 100%;
    max-width: 480px;
`;

export const ComplexHeader = styled.div`
    width: 100%;
    padding: 18px;

    & h3 {
        background-color: var(--color-primary);
        border-radius: 10px;
        width: 100%;
        padding: 10px 25px;
        color: var(--color-text);
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        cursor: default;
    }
`;

export const ComplexBody = styled.div`
    padding: 0 48px 24px 48px;

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

export const ComplexButtons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 40px;

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

    & .closeButton {
        background-color: var(--color-stroke);
    }

    & .deleteButton {
        background-color: var(--color-alarm);
    }
`;
