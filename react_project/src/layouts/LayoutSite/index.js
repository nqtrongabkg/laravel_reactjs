import React, { createContext, useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './layoutSite.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import UserService from '../../services/UserService';
import { toast, ToastContainer } from 'react-toastify';
import ScrollToTopButton from './components/ScrollToTopButton';
import Menu from './components/Menu';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

const LayoutSite = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await UserService.login({ username, password });
            if (response.status) {
                // console.log(response.user);
                localStorage.setItem('user', JSON.stringify(response.user));
                setUser(response.user);
                toast.success('Logged in successfully');
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Sai thông tin đăng nhập');
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            <div className="site-container">
                <ToastContainer/>
                <div className="site-content">
                    <Header />
                    <Menu/>
                    <Outlet />
                </div>
                <Footer />
            </div>
            <ScrollToTopButton />
        </UserContext.Provider>
    );
};

export default LayoutSite;
