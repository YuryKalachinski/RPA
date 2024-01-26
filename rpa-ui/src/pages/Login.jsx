import { jwtDecode } from 'jwt-decode';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';
import { authenticate } from '../http/userAPI';
import { MAIN_ROUTE, ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants';

const Login = () => {
    const { setHost } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const getHostFromJwtToken = (jwtToken) => {
        const decodedToken = jwtDecode(jwtToken);
        return {
            firstName: decodedToken.first_name,
            lastName: decodedToken.last_name,
            email: decodedToken.email,
            role: decodedToken.role,
        };
    };

    const login = async (event) => {
        event.preventDefault();
        try {
            const response = await authenticate(email, password);
            const accessToken = response.data.access_token;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            const refreshToken = response.data.refresh_token;
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
            setHost(getHostFromJwtToken(accessToken));
            navigate(MAIN_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <div>
            <form onSubmit={login}>
                <input
                    type="text"
                    placeholder="Login"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>Enter</button>
            </form>
        </div>
    );
};

export default Login;
