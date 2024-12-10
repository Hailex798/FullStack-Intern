import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(() => {
        const savedData = localStorage.getItem('userData');
        return savedData ? JSON.parse(savedData) : null;
    });

    const saveUserData = (data) => {
        setUserData(data);
        localStorage.setItem('userData', JSON.stringify(data));
    };

    const clearUserData = () => {
        setUserData(null);
        localStorage.removeItem('userData');
    };

    const logout = () => {
        console.log('Logout triggered');
        clearUserData();
        alert("You have succesfully logged out!")
    };
    

    return (
        <UserContext.Provider value={{ userData, setUserData: saveUserData, clearUserData, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, useUser };
