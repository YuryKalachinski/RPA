import { useImmer } from "use-immer";
import set from "lodash/set";
import {
    SubstationContainer,
    SubstationHeader,
    SubstationWrapper,
    SubstationBody,
    SubstationButtons,
} from "./styled";
import { useSubList } from "../../../context/subListProvider";
import { TextAreaField, TextField, SelectField } from "../../form";
import { useUtility } from "../../../context/utilityProvider";
import { Button } from "../../common/button";

const Substation = ({ substation, onClose }) => {
    const isNewSub = substation.id ? false : true;
    const [current, setCurrent] = useImmer(substation);
    const { addUpdateSub } = useSubList();
    const { branches } = useUtility();

    const handleChange = (path, value) => {
        setCurrent((draft) => {
            set(draft, path, value);
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        addUpdateSub(isNewSub ? current : getChangedValues());
        onClose();
    };

    const closeForm = async (event) => {
        event.preventDefault();
        onClose();
    };

    const getChangedValues = () => {
        return Object.keys(current).reduce(
            (acc, key) => {
                if (current[key] !== substation[key]) {
                    acc[key] = current[key];
                }
                return acc;
            },
            { id: current.id },
        );
    };

    return (
        <SubstationContainer>
            <SubstationWrapper>
                <SubstationHeader>
                    <h3>
                        {isNewSub
                            ? "Новая подстанция:"
                            : "Редактор подстанции:"}
                    </h3>
                </SubstationHeader>
                <SubstationBody>
                    <TextField
                        label="Имя подстанции"
                        name="name"
                        value={current.name}
                        onChange={handleChange}
                    />
                    <SelectField
                        optionsArray={branches}
                        defaultOption="Выберете филиал"
                        label="Филиал"
                        name="branch"
                        value={current.branch}
                        onChange={handleChange}
                    />
                    <TextAreaField
                        label="Описание подстанции"
                        name="description"
                        value={current.description}
                        onChange={handleChange}
                    />
                    <SubstationButtons>
                        <Button onClick={closeForm} variant="close">
                            Закрыть
                        </Button>
                        <Button onClick={handleSubmit}>
                            {isNewSub ? "Добавить" : "Изменить"}
                        </Button>
                    </SubstationButtons>
                </SubstationBody>
            </SubstationWrapper>
        </SubstationContainer>
    );
};

export default Substation;
