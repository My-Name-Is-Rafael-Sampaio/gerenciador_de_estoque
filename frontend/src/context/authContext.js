import React, { createContext, useEffect, useState } from 'react';

import Api from '../config/configApi';

const Context = createContext();

function AuthProvider({children}) {

    const [authenticated, setAuthenticated] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getLogin = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                Api.defaults.headers.Authorization = `Bearer ${(token)}`;
                setAuthenticated(true);
            }

            setLoading(false);
        }

        getLogin();
    }, []);

    const validadeUser = () => {
        const valueToken = localStorage.getItem('token');

        const headers = {
            'headers': {
                'Authorization': `Bearer ${(valueToken)}`
            }
        }


        Api.get("/validateToken", headers)
            .then(() => {
                return true;
            })
            .catch(() => {
                localStorage.removeItem('token');
                setAuthenticated(false);
                return false;
            })
    }

    function signIn(sit) {
        setAuthenticated(sit);
    }

    function handleLogout() {
        setAuthenticated(false);
        localStorage.removeItem('token');
        Api.defaults.headers.Authorization = undefined;
    }

    if (loading) {
        return <h1>Carregando...</h1>
    }

    return (
        <Context.Provider value={{authenticated, signIn, handleLogout, validadeUser}}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };