import { useMemo } from "react";
import { useUtility } from "../../../context/utilityProvider";
import { EditLogo } from "../../common/images";
import {
    ParameterListBody,
    ParameterListConteiner,
    ParameterListWrapper,
} from "./styled";
import { sortFromDictionary } from "../../../utils/methods";

const ParameterList = ({ psl, pathArray, openModal }) => {
    const { parameterDictionary } = useUtility();

    const sortedList = useMemo(() => {
        if (!psl) return [];
        return [...psl].sort((a, b) => {
            return sortFromDictionary(a.key, b.key, parameterDictionary);
        });
    }, [psl, parameterDictionary]);

    return (
        <ParameterListConteiner>
            <ParameterListWrapper>
                <ParameterListBody>
                    <table>
                        <thead>
                            <tr>
                                <th>Параметр</th>
                                <th>Значение</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedList.map((parameter, paramIndx) => (
                                <tr key={paramIndx}>
                                    <td>
                                        {parameter.key}{" "}
                                        {parameter.unit
                                            ? `, ${parameter.unit}`
                                            : ""}
                                    </td>
                                    <td>
                                        {parameter.value}
                                        <img
                                            key={paramIndx}
                                            src={EditLogo}
                                            alt="Edit parameter setting"
                                            onClick={() =>
                                                openModal(
                                                    parameter,
                                                    pathArray,
                                                    psl.indexOf(parameter),
                                                    "param",
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ParameterListBody>
            </ParameterListWrapper>
        </ParameterListConteiner>
    );
};

export default ParameterList;
