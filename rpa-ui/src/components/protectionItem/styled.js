import styled from "styled-components";

export const ProtectionItemConteiner = styled.div``;

export const ProtectionItemWrapper = styled.div`
    background: var(--color-bg-medium);
    border-radius: var(--border-10);
    color: var(--color-text);
`;

export const ProtectionItemBody = styled.div`
    padding: 0 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    & table {
        margin-left: 20px;
        border-collapse: collapse;
        width: 80%;
    }

    & th,
    td {
        border: 1px solid;
        padding: 5px 10px;
        font-size: 14px;
        line-height: 120%;
        text-align: left;
        color: var(--color-link-hover);
        font-weight: 400;
    }
`;

export const SettingsButton = styled.button`
    background: transparent;
    color: var(--color-link-hover);
    border: none;
    outline: none;
    font-size: 14px;
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
`;

export const ProtectionItemTitle = styled.div`
    padding: 1px 0 1px 30px;
    text-align: left;
`;

export const ProtActionItemTitle = styled.div`
    padding-top: 12px;
    font-size: 14px;
    line-height: 120%;
    margin-bottom: 4px;
`;
