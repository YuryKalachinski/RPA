import styled from "styled-components";

export const ComplexContainer = styled.div`
    filter: ${({ $isModalOpen }) =>
        $isModalOpen ? "brightness(0.5) blur(2px)" : "none"};
    transition: filter 0.3s ease;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ComplexWrapper = styled.div`
    background-color: var(--color-bg-medium);
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid var(--color-bg);
    border-radius: 20px;
    margin: 24px 0;
    width: 100%;
    max-width: 720px;
`;

export const ComplexHeader = styled.div`
    width: 100%;
    padding: 18px;

    & h3 {
        background-color: var(--color-primary);
        border-radius: 10px;
        width: 100%;
        padding: 10px 25px;
        color: var(--color-text);
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        cursor: default;
    }
`;

export const ComplexBody = styled.div`
    width: 85%;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
`;

export const ComplexBottom = styled.div`
    margin: 24px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 40px;

    & button {
        background-color: var(--color-primary);
        color: var(--color-text);
        border: none;
        border-radius: 10px;
        padding: 12px 24px;
        font-size: 18px;
        line-height: 120%;
        text-align: center;
        width: 100%;
        cursor: pointer;
    }

    & .closeButton {
        background-color: var(--color-stroke);
    }

    & .deleteButton {
        background-color: var(--color-alarm);
    }
`;

export const SettingsRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const SettingsButton = styled.button`
    height: 24px;
    background: transparent;
    color: var(--color-link-hover);
    border: none;
    outline: none;
    font-size: 18px;
    font-weight: 400;
    line-height: 120%;
    text-align: center;
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
        width: 22px;
        position: absolute;
        top: 0%;
        left: 10px;

        &:hover {
            opacity: 0.8;
        }
    }

    & p {
        margin: 0;
        padding-left: 30px;
        text-align: left;
    }
`;

export const SettingsEdit = styled.div`
    margin: 0 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & img {
        width: 24px;
        cursor: pointer;

        &:hover {
            opacity: 0.8;
        }
    }
`;

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

export const ProtectionItemTitle = styled.div`
    padding-left: 30px;
    text-align: left;
`;

export const ParameterListConteiner = styled.div``;

export const ParameterListWrapper = styled.div`
    margin: 8px;
    background: var(--color-bg-light);
`;

export const ParameterListBody = styled.div`
    & table {
        border-collapse: collapse;
        width: 100%;
    }

    & th,
    & td {
        border: 1px solid;
        padding: 5px 10px;
        font-size: 12px;
        line-height: 120%;
        text-align: left;
        color: var(--color-link-hover);
        font-weight: 400;
    }

    & td {
        position: relative;
        & img {
            width: 24px;
            height: 24px;
            position: absolute;
            display: block;
            top: 50%;
            transform: translateY(-50%);
            right: 8px;
            cursor: pointer;

            &:hover {
                opacity: 0.8;
            }
        }
    }
`;
