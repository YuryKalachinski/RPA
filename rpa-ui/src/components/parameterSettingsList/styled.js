import styled from "styled-components";

export const ParameterSettingsListConteiner = styled.div``;

export const ParameterSettingsListWrapper = styled.div`
    margin-left: 20px;
    background: var(--color-bg-light);
`;

export const ParameterSettingsListBody = styled.div`
    & table {
        border-collapse: collapse;
        width: 100%;
    }

    & th,
    td {
        border: 1px solid;
        padding: 5px 10px;
        font-size: 12px;
        line-height: 120%;
        text-align: left;
        color: var(--color-link-hover);
        font-weight: 400;
    }
`;
