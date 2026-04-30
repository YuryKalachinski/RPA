import styled from "styled-components";

export const ProtectionItemContainer = styled.div``;

export const ProtectionItemWrapper = styled.div`
    background: var(--color-bg-medium);
    border-radius: var(--border-10);
    color: var(--color-text);
`;

export const ProtectionItemBody = styled.div`
    margin: 8px 0 0;
    padding: ${({ $visible }) => ($visible ? "8px 0 0 12px" : "0 0 0 12px")};
    display: flex;
    flex-direction: column;
    border: ${({ $visible }) => ($visible ? "solid 1px" : "none")};
    border-radius: 10px;
`;

export const SettingsButton = styled.button`
    background: transparent;
    color: var(--color-link-hover);
    border-radius: 10px;
    border: none;
    outline: none;
    font-size: 14px;
    line-height: 120%;
    text-align: center;
    width: fit-content;
    cursor: pointer;
    position: relative;

    &:hover {
        background-color: var(--color-bg-light);
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
    padding: 0 30px;
    text-align: left;
`;
