import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routers/appRouter";
import Navbar from "./components/navbar/navbar";
import AuthProvider from "./context/authProvider";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <AppRouter />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
