import styled from "styled-components";

export const ProtectionItemContainer = styled.div``;

export const ProtectionItemWrapper = styled.div`
    background: var(--color-bg-medium);
    border-radius: var(--border-10);
    color: var(--color-text);
`;

export const ProtectionItemBody = styled.div`
    margin: ${({ $visible }) => ($visible ? "8px 0 0 0" : "0")};
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
    padding-left: 30px;
    text-align: left;
`;

// export const ProtActionItemTitle = styled.div`
//     padding-top: 12px;
//     font-size: 14px;
//     line-height: 120%;
//     margin-bottom: 4px;
// `;
