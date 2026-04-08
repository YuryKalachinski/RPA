import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authProvider";
import {
    ABOUT_ROUTE,
    USERS_ROUTE,
    MAIN_ROUTE,
    SUBSTATIONS_ROUTE,
} from "../../utils/constants";
import {
    NavbarContainer,
    NavbarWrapper,
    NavbarLogo,
    NavbarUser,
    NavbarMenu,
} from "./styled";
import { AppLogo, UserLogo } from "../common/images/";

const Navbar = () => {
    const { currentUser, logOut } = useAuth();
    const navigate = useNavigate();

    return (
        <NavbarContainer>
            {currentUser && (
                <NavbarWrapper>
                    <NavbarLogo>
                        <img src={AppLogo} alt="Logo is here" />
                    </NavbarLogo>

                    <NavbarMenu>
                        <button onClick={() => navigate(MAIN_ROUTE)}>
                            Главная
                        </button>
                        <button onClick={() => navigate(SUBSTATIONS_ROUTE)}>
                            Список подстанций
                        </button>
                        <button onClick={() => navigate(USERS_ROUTE)}>
                            Пользователи
                        </button>
                        <button onClick={() => navigate(ABOUT_ROUTE)}>
                            О программе
                        </button>
                    </NavbarMenu>

                    <NavbarUser>
                        <img src={UserLogo} alt="User icon" />
                        <p>{currentUser.firstName}</p>
                        <button onClick={logOut}>Выйти</button>
                    </NavbarUser>
                </NavbarWrapper>
            )}
        </NavbarContainer>
    );
};

export default Navbar;
