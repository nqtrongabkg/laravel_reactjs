import React from 'react';
import UserDetail from "./userComponent/UserDetail";
import Login from "./userComponent/Login";
import { useUserContext } from '../../layouts/LayoutSite';

const User = () => {
    const { user } = useUserContext();
    return (
        <>
            {user ? <UserDetail user={user} /> : <Login />}
        </>
    );
};

export default User;
