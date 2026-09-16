import { AboutContainer, Resolved } from "./styled";

const AboutItem = () => {
    return (
        <AboutContainer>
            <p>Лист задач:</p>
            <hr />
            <p>-заполнение Postman</p>
            <p>-заменить class на record</p>
            <p>-паспорта на устройства РЗА</p>
            <p>-наполнение БД</p>
            <p>-шаблоны устройств РЗА</p>
            <p>-фильтрация по филиалам</p>
            <Resolved>-кнопка как отдельный компонент</Resolved>
            <Resolved>-кнопка "назад"</Resolved>
            <Resolved>-mode режим для admin/viewer</Resolved>
            <Resolved>-приоритет защит/параметров</Resolved>
        </AboutContainer>
    );
};

export default AboutItem;
