import styled from "styled-components";

export const LoadingAnimationContainer = styled.div`
    height: 10vh;
    width: 10vw;
    position: fixed;
    top: 45vh;
    left: 45vw;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LoadingAnimationWrapper = styled.div`
    width: 50px;
    height: 50px;
    background-color: var(--color-primary-hover);
    animation: rotate-cube 1.2s infinite ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & p {
        margin: 12px 0px;
        color: var(--color-text);
        font-size: 24px;
        font-weight: 700;
        text-align: center;
        cursor: default;
    }

    @keyframes rotate-cube {
        0% {
            transform: perspective(120px) rotateX(0deg) rotateY(0deg);
        }
        50% {
            transform: perspective(120px) rotateX(0deg) rotateY(-180deg);
        }
        100% {
            transform: perspective(120px) rotateX(0deg) rotateY(0deg);
        }
    }
`;
