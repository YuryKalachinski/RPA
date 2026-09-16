import styled from "styled-components";

export const AboutContainer = styled.div`
    color: var(--color-text);

    & p {
        margin: 16px;
    }

    & .strikethrough {
        text-decoration: line-through;
    }

    & hr {
        background-color: var(--color-link-hover);
        width: 100%;
    }
`;

export const Resolved = styled.p`
    text-decoration: line-through;
`;
