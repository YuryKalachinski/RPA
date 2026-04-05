import {
    ParameterSettingsListBody,
    ParameterSettingsListConteiner,
    ParameterSettingsListWrapper,
} from "./styled";

const ParameterSettingsList = ({ psl }) => {
    return (
        <ParameterSettingsListConteiner>
            <ParameterSettingsListWrapper>
                <ParameterSettingsListBody>
                    {psl.length > 0 && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Параметр</th>
                                    <th>Значение</th>
                                </tr>
                            </thead>
                            <tbody>
                                {psl.map((setting) => (
                                    <tr key={setting.id}>
                                        <td>{setting.key}</td>
                                        <td>{setting.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </ParameterSettingsListBody>
            </ParameterSettingsListWrapper>
        </ParameterSettingsListConteiner>
    );
};

export default ParameterSettingsList;
