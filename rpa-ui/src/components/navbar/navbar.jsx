import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authProvider";
import {
    ABOUT_ROUTE,
    USERS_ROUTE,
    MAIN_ROUTE,
    SUBSTATIONS_ROUTE,
    LOGIN_ROUTE,
} from "../../utils/constants";
import localStorageServive from "../../utils/localStorageService";
import {
    NavbarContainer,
    NavbarWrapper,
    NavbarLogo,
    NavbarUser,
    NavbarMenu,
} from "./styled";
import rzaLogo from "./images/logo.svg";
import userIcon from "./images/user.svg";

const Navbar = () => {
    const { currentUser, setCurrentUser } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        setCurrentUser(null);
        localStorageServive.logOut();
        navigate(LOGIN_ROUTE, { replace: true });
    };

    return (
        <NavbarContainer>
            {currentUser && (
                <NavbarWrapper>
                    <NavbarLogo>
                        <img src={rzaLogo} alt="Logo is here" />
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
                        <img src={userIcon} alt="User icon" />
                        <p>{currentUser.firstName}</p>
                        <button onClick={logout}>Выйти</button>
                    </NavbarUser>
                </NavbarWrapper>
            )}
            ;
        </NavbarContainer>
    );
};

export default Navbar;
