import styled from "styled-components";

export const SubstationItemContainer = styled.div``;

export const SubstationItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 24px;
`;

export const SubstationItemTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const SubstationItemHeader = styled.div`
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

export const BayList = styled.div`
    width: 100%;
    margin: 0 auto;
    padding-left: 12px;

    & p {
        margin-bottom: 12px;
        color: var(--color-text);
        font-size: 18px;
        font-weight: 400;
        align-self: stretch;
        cursor: pointer;
    }
`;

export const BayListItem = styled.div`
    align-self: stretch;
    padding: 0 24px;

    & button {
        background: transparent;
        color: var(--color-link-hover);
        border: none;
        outline: none;
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        cursor: pointer;
    }
`;

export const SubstationItemBottom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    & hr {
        background-color: var(--color-link-hover);
        width: 100%;
    }
`;
