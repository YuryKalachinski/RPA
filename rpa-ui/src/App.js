import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routers/appRouter";
import { Navbar } from "./components/navbar";
import { AuthProvider } from "./context";
import UtilityProvider from "./context/utilityProvider";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <UtilityProvider>
                    <Navbar />
                    <AppRouter />
                </UtilityProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
