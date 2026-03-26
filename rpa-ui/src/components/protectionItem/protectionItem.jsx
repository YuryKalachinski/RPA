import { useState } from "react";
import {
    ProtectionItemConteiner,
    ProtectionItemWrapper,
    ProtectionItemBody,
    ProtectionItemTitle,
    SettingsButton,
    // ProtActionItemTitle,
} from "./styled";
import minus from "./images/minus.svg";
import plus from "./images/plus.svg";

const ProtectionItem = ({ prot }) => {
    const [visible, setVisible] = useState(false);

    const changeComplexForm = () => {
        setVisible((prevState) => !prevState);
    };

    return (
        <ProtectionItemConteiner>
            <ProtectionItemWrapper>
                <ProtectionItemBody>
                    {/* <ProtActionItemTitle>{prot.protAction}</ProtActionItemTitle> */}
                    {visible ? (
                        <>
                            <SettingsButton onClick={changeComplexForm}>
                                <img src={minus} alt="Collapse group" />
                                <ProtectionItemTitle>
                                    {prot.name}
                                </ProtectionItemTitle>
                            </SettingsButton>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Параметр</th>
                                        <th>Значение</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prot.parameterSettings.map((setting) => (
                                        <tr key={setting.id}>
                                            <td>{setting.key}</td>
                                            <td>{setting.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <>
                            <SettingsButton onClick={changeComplexForm}>
                                <img src={plus} alt="Expland group" />
                                <ProtectionItemTitle>
                                    {prot.name}
                                </ProtectionItemTitle>
                            </SettingsButton>
                        </>
                    )}
                </ProtectionItemBody>
            </ProtectionItemWrapper>
        </ProtectionItemConteiner>
    );
};

export default ProtectionItem;
