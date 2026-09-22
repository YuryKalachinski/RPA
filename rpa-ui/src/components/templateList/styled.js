import styled from "styled-components";

export const TemplateListContainer = styled.div``;

export const TemplateListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

export const TemplateListTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 8px;
`;

export const TemplateListHeader = styled.div`
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

export const NewTemplateItem = styled.div`
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

export const TemplateListBody = styled.div`
    width: 100%;
    align-items: flex-start;
    display: flex;
`;

export const TemplateListBodyItem = styled.div`
    flex: 2;
    display: flex;
    align-self: center;
`;

export const TemplateComplexItem = styled.div`
    min-width: 50%;
    padding: 24px;
    position: relative;
    border-radius: 12px;
    background-color: var(--color-bg-light);
`;

export const TemplateComplexItemClose = styled.button`
    background: transparent;
    color: var(--color-link-hover);
    border: none;
    outline: none;
    text-align: center;
    cursor: pointer;
    position: absolute;
    top: 2%;
    right: 0%;

    &:focus:not(:focus-visible) {
        outline: none;
    }
    & img {
        width: 20px;
    }
`;

export const TemplateListBodyGroup = styled.div`
    flex: 1;
    align-self: flex-start;
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const TemplateListBottom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    & button {
        width: fit-content;
    }

    & hr {
        background-color: var(--color-link-hover);
        width: 100%;
    }
`;
