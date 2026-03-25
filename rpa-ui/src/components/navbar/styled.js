import styled from "styled-components";

export const NavbarContainer = styled.div`
    background-color: var(--color-bg-medium);
    width: 100%;
    margin: 0;
`;

export const NavbarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32px 24px;
`;

export const NavbarLogo = styled.div`
    width: 20%;
    & img {
        width: 100%;
        height: 50px;
    }
`;

export const NavbarUser = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    & p {
        margin: 0;
        color: var(--color-text);
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        cursor: default;
    }

    & button {
        background: transparent;
        color: var(--color-link-hover);
        border: none;
        outline: none;
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        cursor: pointer;
    }
`;

export const NavbarMenu = styled.div`
    display: flex;
    gap: 32px;
    & button {
        background: transparent;
        color: var(--color-link-hover);
        border: none;
        outline: none;
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        cursor: pointer;
    }

    & button:active {
        border: 1px solid var(--color-stroke);
        border-radius: var(--border-8);
    }
`;
