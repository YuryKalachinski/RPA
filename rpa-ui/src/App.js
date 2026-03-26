import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routers/appRouter";
import Navbar from "./components/navbar/navbar";
import AuthProvider from "./context/authProvider";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <AppRouter />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
