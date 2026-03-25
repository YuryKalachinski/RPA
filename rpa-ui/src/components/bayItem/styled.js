import styled from "styled-components";

export const BayItemContainer = styled.div`
    background-color: var(--color-bg);
`;

export const BayItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 24px;
`;

export const BayItemTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const BayItemHeader = styled.div`
    margin: 0 auto;
    width: 100%;
    & h3 {
        margin-bottom: 12px;
        color: var(--color-text);
        font-size: 24px;
        font-weight: 700;
        text-align: center;
    }

    & p {
        margin-bottom: 12px;
        color: var(--color-text);
        font-size: 18px;
        font-weight: 400;
        align-self: stretch;
    }
`;

export const ComplexList = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 80px;
`;

export const BayItemBottom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    & hr {
        background-color: var(--color-link-hover);
        width: 100%;
    }
`;
