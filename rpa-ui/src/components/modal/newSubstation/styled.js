import styled from "styled-components";

export const NewSubstationContainer = styled.div`
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

export const NewSubstatioWrapper = styled.div`
    background-color: var(--color-bg-medium);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    margin: 24px 0;
    width: 100%;
    max-width: 480px;
`;

export const NewSubstationHeader = styled.div`
    width: 100%;
    padding: 18px;

    & h3 {
        background-color: var(--color-primary);
        border-radius: 10px;
        width: 100%;
        margin-bottom: 12px;
        padding: 10px 25px;
        color: var(--color-text);
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        cursor: default;
    }
`;

export const NewSubstationBody = styled.div`
    padding: 0 48px;
`;
