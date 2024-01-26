import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/ui/navbar/Navbar';
import { AuthContext } from './context';
import { ACCESS_TOKEN } from './utils/constants';

function App() {
    const [host, setHost] = useState(null);

    useEffect(() => {
        let accessToken;
        if ((accessToken = localStorage.getItem(ACCESS_TOKEN))) {
            setHost(getHostFromJwtToken(accessToken));
        }
    }, []);

    const getHostFromJwtToken = (jwtToken) => {
        const decodedToken = jwtDecode(jwtToken);
        return {
            firstName: decodedToken.first_name,
            lastName: decodedToken.last_name,
            email: decodedToken.email,
            role: decodedToken.role,
        };
    };

    return (
        <AuthContext.Provider value={{ host, setHost }}>
            <BrowserRouter>
                <Navbar />
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
