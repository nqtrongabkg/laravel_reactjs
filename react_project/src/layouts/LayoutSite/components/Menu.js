import React, { useState, useEffect } from 'react';
import MenuService from '../../../services/MenuService';
import { Link } from 'react-router-dom';

export default function Menu() {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const result = await MenuService.index();
                setMenus(result.menus);
            } catch (error) {
                console.error("Error fetching menus:", error);
            }
        };
        fetchMenus();
    }, []);

    return (
        <nav className="menu-navbar navbar navbar-expand-lg navbar-light bg-primary">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="menu-nav navbar-nav ml-auto">
                        {menus.map(menu => (
                            <li key={menu.id} className="nav-item">
                                <Link className="menu-nav-link nav-link" to={menu.link}>
                                    {menu.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
