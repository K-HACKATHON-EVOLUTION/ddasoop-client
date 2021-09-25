import React, { useState, createContext } from 'react';

const UserContext = createContext({
    user: {
        email: null,
        uid: null,
        userName: null,
        treeImg: null,
        totalCarbon: null,
    },
    dispatch: () => {},
});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const dispatch = ({ email, uid, userName, treeImg, totalCarbon }) => {
        setUser({ email, uid, userName, treeImg, totalCarbon });
    };
    const value = { user, dispatch };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };