import styled from "styled-components";

export const ComplexItemConteiner = styled.div``;

export const ComplexItemWrapper = styled.div`
    background: var(--color-bg-medium);
    border-radius: var(--border-10);
    color: var(--color-text);
    margin-bottom: 24px;
`;

export const ComplexItemBody = styled.div`
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const SettingsButton = styled.button`
    background: transparent;
    color: var(--color-link-hover);
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    line-height: 120%;
    text-align: center;
    cursor: pointer;
    position: relative;

    &:hover {
        background-color: var(--color-primary-hover);
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
        margin: 0;
        padding-left: 30px;
        text-align: left;
    }
`;

export const ComplexItemTitle = styled.div`
    padding-top: 12px;
    font-weight: 700;
    font-size: 16px;
    line-height: 120%;
    margin-bottom: 4px;
`;

export const ComplexItemType = styled.div`
    padding-top: 12px;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    margin-bottom: 4px;
`;
