import styled from "styled-components";

export const SubstationItemContainer = styled.div``;

export const SubstationItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

export const SubstationItemTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 8px;
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
        margin: 0 48px;
        color: var(--color-text);
        font-size: 18px;
        font-weight: 400;
    }
`;

export const SubstationItemBody = styled.div`
    width: 100%;
    margin: 0 auto;
    padding-left: 12px;
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
        position: relative;
    }
`;

export const NewBayListItem = styled.div`
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
