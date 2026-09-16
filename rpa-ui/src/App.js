import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routers/appRouter";
import { Navbar } from "./components/navbar";
import { AuthProvider, TemplateProvider } from "./context";
import UtilityProvider from "./context/utilityProvider";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <UtilityProvider>
                    <TemplateProvider>
                        <Navbar />
                        <AppRouter />
                    </TemplateProvider>
                </UtilityProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
