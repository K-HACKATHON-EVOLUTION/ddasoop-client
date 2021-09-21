import React, { useState, createContext } from 'react';

const UserContext = createContext({
    user: {
        email: null,
        uid: null,
        displayName: null,
        totalCarbon: null,
        group: null,

    },
    dispatch: () => {},
});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const dispatch = ({ email, uid, totalCarbon, displayName }) => {
        setUser({ email, uid, totalCarbon, displayName, group: null });
    };
    const value = { user, dispatch };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };