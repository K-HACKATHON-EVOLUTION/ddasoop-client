import { getMediaLibraryPermissionsAsync } from 'expo-image-picker';
import React, { useState, createContext } from 'react';

const UserContext = createContext({
    user: {
        email: null,
        uid: null,
        userName: null,
        trees: null
    },
    dispatch: () => {},
});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const dispatch = ({ email, uid, userName, trees }) => {
        setUser({ email, uid, userName, trees });
    };
    const value = { user, dispatch };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };