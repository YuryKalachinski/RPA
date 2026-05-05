import { EditLogo } from "../../common/images";
import {
    ParameterListBody,
    ParameterListConteiner,
    ParameterListWrapper,
} from "./styled";

const ParameterList = ({ psl, pathArray, openModal }) => {
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
                            {psl.map((parameter, paramIndx) => (
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
                                            key={parameter.id + parameter.key}
                                            src={EditLogo}
                                            alt="Edit parameter setting"
                                            onClick={() =>
                                                openModal(
                                                    parameter,
                                                    pathArray,
                                                    paramIndx,
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
