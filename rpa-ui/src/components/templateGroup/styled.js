import styled from "styled-components";

export const TemplateGroupContainer = styled.div``;

export const TemplateGroupWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

export const TemplateListBody = styled.div`
    align-self: flex-start;
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const TemplateListItem = styled.button`
    background: transparent;
    color: var(--color-link-hover);
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    line-height: 120%;
    text-align: center;
    width: fit-content;
    cursor: pointer;
    position: relative;

    &:hover {
        background-color: var(--color-bg-light);
        border-radius: 10px;
    }

    &:focus:not(:focus-visible) {
        outline: none;
    }

    & img {
        width: 20px;
        position: absolute;
        top: 0%;
        left: 10px;
    }

    & p {
        width: fit-content;
        margin: 0;
        padding: 0 30px;
        text-align: left;
    }
`;

export const TemplateItem = styled.button`
    margin-left: 30px;
    background: transparent;
    color: var(--color-link-hover);
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    line-height: 120%;
    text-align: center;
    width: fit-content;
    cursor: pointer;
    position: relative;
    padding: 0 30px;
    text-align: left;

    &:hover {
        background-color: var(--color-bg-light);
        border-radius: 10px;
    }

    &:focus:not(:focus-visible) {
        outline: none;
    }
`;
