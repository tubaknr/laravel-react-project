import { createContext, useContext, useState } from 'react';

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: 'Tuba',
    });
    const [token, _setToken] = useState(null);

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token); //tarayıcı kapansa bile token bilgisi korunabilir.
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };
    return (
        <StateContext.Provider
            value={{
                // Bu context içinde olan tüm bileşenler bu verilere erişebilir.
                user,
                token,
                setUser,
                setToken,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
