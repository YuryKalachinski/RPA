import { useTemplate } from "../../context/templateProvider";
import {
    NewTemplateItem,
    TemplateListBody,
    TemplateListBottom,
    TemplateListContainer,
    TemplateListHeader,
    TemplateListTop,
    TemplateListWrapper,
} from "./styled";
import TemplateGroup from "../templateGroup/templateGroup";
import { Button } from "../common/button";
import { useNavigate } from "react-router-dom";
import { ROLE_ADMIN } from "../../utils/constants";
import { useAuth } from "../../context/authProvider";
import { PlusLogo } from "../common/images/";

const TemplateList = () => {
    const { templateGroups } = useTemplate();
    const navigate = useNavigate();
    const { permission } = useAuth();

    const addComplex = () => {};

    return (
        <>
            <TemplateListContainer>
                <TemplateListWrapper>
                    <TemplateListTop>
                        <TemplateListHeader>
                            <h3>Шаблоны защит:</h3>
                        </TemplateListHeader>
                        {permission === ROLE_ADMIN && (
                            <NewTemplateItem>
                                <button onClick={() => addComplex()}>
                                    <p>Добавить новый шаблон</p>
                                    <img src={PlusLogo} alt="add new bay" />
                                </button>
                            </NewTemplateItem>
                        )}
                    </TemplateListTop>
                    <TemplateListBody>
                        {Object.entries(templateGroups).map(
                            ([manufacturer, temps]) => (
                                <TemplateGroup
                                    key={manufacturer}
                                    manufacturer={manufacturer}
                                    temps={temps}
                                />
                            ),
                        )}
                    </TemplateListBody>
                    <TemplateListBottom>
                        <hr />
                        <Button
                            onClick={() => {
                                navigate(-1);
                            }}
                            variant="back"
                        >
                            Назад
                        </Button>
                    </TemplateListBottom>
                </TemplateListWrapper>
            </TemplateListContainer>
        </>
    );
};

export default TemplateList;
