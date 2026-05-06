import { useMemo } from "react";
import { useUtility } from "../../context/utilityProvider";
import {
    ParameterSettingsListBody,
    ParameterSettingsListConteiner,
    ParameterSettingsListWrapper,
} from "./styled";
import { sortFromDictionary } from "../../utils/methods";

const ParameterSettingsList = ({ psl }) => {
    const { parameterDictionary } = useUtility();

    const sortedList = useMemo(() => {
        if (!psl) return [];
        return [...psl].sort((a, b) => {
            return sortFromDictionary(a.key, b.key, parameterDictionary);
        });
    }, [psl, parameterDictionary]);

    return (
        <ParameterSettingsListConteiner>
            <ParameterSettingsListWrapper>
                <ParameterSettingsListBody>
                    <table>
                        <thead>
                            <tr>
                                <th>Параметр</th>
                                <th>Значение</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedList.map((setting, settingIndx) => (
                                <tr key={settingIndx}>
                                    <td>
                                        {setting.key}
                                        {setting.unit
                                            ? `, ${setting.unit}`
                                            : ""}
                                    </td>
                                    <td>{setting.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ParameterSettingsListBody>
            </ParameterSettingsListWrapper>
        </ParameterSettingsListConteiner>
    );
};

export default ParameterSettingsList;
