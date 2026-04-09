import styled from "styled-components";

export const SubstationListContainer = styled.div``;

export const SubstationListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

export const SubstationListTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 8px;
`;

export const SubstationListHeader = styled.div`
    margin: 0 auto;
    & h3 {
        margin-bottom: 12px;
        color: var(--color-text);
        font-size: 24px;
        font-weight: 700;
        text-align: center;
        cursor: default;
    }
`;

export const NewSubstationListItem = styled.div`
    height: 32px;
    align-self: stretch;
    padding: 0 24px;
    margin-bottom: 8px;

    & button {
        background: transparent;
        color: var(--color-link-hover);
        border: none;
        outline: none;
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        cursor: pointer;
        position: relative;

        &:hover {
            background-color: var(--color-bg-light);
        }
    }

    & img {
        width: 24px;
        position: absolute;
        top: 0%;
        left: 10px;
    }

    & p {
        padding-left: 30px;
        margin: 0;
    }
`;

export const SubstationListBody = styled.div`
    align-self: flex-start;
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const SubstationListRow = styled.div`
    padding: 0 24px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    &:hover {
        background-color: var(--color-bg-light);
    }
`;

export const SubstationListItem = styled.button`
    background: transparent;
    color: var(--color-link-hover);
    border-radius: 10px;
    border: none;
    outline: none;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    cursor: pointer;
    display: flex;

    & p {
        margin: 0 16px 0 0;
    }
`;

export const SubstationListItemButton = styled.button`
    background: transparent;
    color: var(--color-link-hover);
    border: none;
    outline: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: 24px;

    &:focus:not(:focus-visible) {
        outline: none;
    }

    & img {
        width: 24px;
        height: 24px;
        position: absolute;
    }
`;

export const SubstationListBottom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;
