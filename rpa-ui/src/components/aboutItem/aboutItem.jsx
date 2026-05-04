import { AboutContainer } from "./styled";

const AboutItem = () => {
    return (
        <AboutContainer>
            <p>Лист задач:</p>
            <p>-кнопка как отдельный компонент</p>
            <p>-кнопка "назад"</p>
            <p>-паспорта на устройства РЗА</p>
            <p>-наполнение БД</p>
            <p className="strikethrough">-mode режим для admin/viewer</p>
            <p>-шаблоны устройств РЗА</p>
            <p>-фильтрация по филиалам</p>
        </AboutContainer>
    );
};

export default AboutItem;
