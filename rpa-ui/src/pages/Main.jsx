import React, { useContext } from 'react';
import { AuthContext } from '../context';

const Main = () => {
    const { host } = useContext(AuthContext);

    return (
        <div>
            <div>Main page</div>
            <div>{host.firstName} entered the system!!!</div>
        </div>
    );
};

export default Main;
