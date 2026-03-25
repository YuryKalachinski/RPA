import { useAuth } from "../context/authProvider";

const Main = () => {
    const { currentUser } = useAuth();

    return (
        <div>
            <div>Main page</div>
            <div>{currentUser.firstName} entered the system!!!</div>
        </div>
    );
};

export default Main;
