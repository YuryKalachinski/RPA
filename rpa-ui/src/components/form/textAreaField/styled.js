import styled from "styled-components";

export const TextAreaFieldStyle = styled.div`
    margin-bottom: 24px;
    position: relative;

    & label {
        color: var(--color-link-hover);
        position: absolute;
        top: 12px;
        left: 40px;
        font-size: 12px;
        line-height: 120%;
    }

    & textarea {
        background-color: var(--color-bg-light);
        color: var(--color-text);
        font-size: 16px;
        line-height: 120%;
        font-family: sans-serif;
        padding: 27px 48px 12px;
        border-radius: 10px;
        border: none;
        width: 100%;
        resize: none;
    }

    & textarea::placeholder {
        color: var(--color-stroke);
        font-size: 16px;
    }
`;
