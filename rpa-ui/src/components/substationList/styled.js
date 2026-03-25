import styled from "styled-components";

export const SubstationListContainer = styled.div`
    background-color: var(--color-bg);
`;

export const SubstationListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 24px;
`;

export const SubstationListHeader = styled.div`
    margin: 0 auto;
    & h3 {
        margin: 12px 0px;
        color: var(--color-text);
        font-size: 24px;
        font-weight: 700;
        text-align: center;
        cursor: default;
    }
`;

export const SubstationListItem = styled.div`
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

        & img {
            width: 24px;
            position: absolute;
            top: 0%;
            left: 10px;
        }

        & p {
            padding-left: 30px;
        }
    }
`;
