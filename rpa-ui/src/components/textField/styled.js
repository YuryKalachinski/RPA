import styled from "styled-components";

export const TextFieldStyle = styled.div`
    margin-bottom: 24px;
    position: relative;

    & label {
        color: var(--color-link-hover);
        position: absolute;
        top: 12px;
        left: 40px;
        font-weight: 400;
        font-size: 12px;
        line-height: 120%;
    }

    & input {
        background-color: var(--color-bg-light);
        color: var(--color-text);
        font-weight: 400;
        font-size: 16px;
        line-height: 120%;
        font-family: sans-serif;
        padding: 27px 48px 12px;
        border-radius: 10px;
        border: none;
        width: 100%;
    }

    & input::placeholder {
        color: var(--color-stroke);
        font-size: 16px;
    }

    & button {
        background-color: var(--color-primary);
        color: var(--color-text);
        border: none;
        border-radius: 10px;
        padding: 12px 24px;
        font-weight: 400;
        font-size: 18px;
        line-height: 120%;
        text-align: center;
    }

    & .img_label {
        position: absolute;
        top: 17px;
        left: 10px;
    }

    & .img_visible {
        position: absolute;
        top: 17px;
        right: 20px;
    }
`;
