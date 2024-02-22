// Header.js

import React, { useState } from 'react';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { GiRotaryPhone } from 'react-icons/gi';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import logo from '../../../assets/images/logo.png';
import '../layoutSite.css';
import ProductService from '../../../services/ProductService';
import { urlImage } from '../../../config';
import { Link } from 'react-router-dom';


const Header = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async () => {
        try {
            if (!searchQuery.trim()) {
                setSearchResults([]);
                return;
            }
            const response = await ProductService.searchLikeName({ query: searchQuery });
            setSearchResults(response.products);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };


    const handleChange = (e) => {
        setSearchQuery(e.target.value);
        // Call the search function for real-time updates
        handleSearch();
    };

    const handleProductClick = () => {
        // Reset searchQuery when a product is clicked
        setSearchQuery('');
    };

    return (
        <Navbar variant="dark" expand="lg" className="header-navbar">
            <Navbar.Brand href="/">
                <img src={logo} height="50" className="d-inline-block align-top" alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form className="mx-auto header-search">
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2 search-input"
                        value={searchQuery}
                        onChange={handleChange}
                    />
                    <Button variant="secondary" className="search-button" onClick={handleSearch}>
                        Search
                    </Button>
                </Form>
                {searchQuery && searchResults.length > 0 && <div className="search-results">
                    {searchResults.map((product) => (
                        <Link to={`/productdetail/${product.id}`} key={product.id} onClick={handleProductClick}>
                            <div key={product.id} className="search-result-item">
                                <img src={`${urlImage}product/${product.image}`} alt={product.name} className="search-result-image" />
                                <h3>{product.name}</h3>
                                {/* Display other product information */}
                            </div>
                        </Link>
                    ))}
                </div>}
                <Nav className="ml-auto">
                    <Nav.Link href="/user" className="header-user-icon">
                        <FaUser size={30} />
                    </Nav.Link>
                    <Nav.Link href="/order" className="header-user-icon">
                        <FaShoppingCart size={30} />
                    </Nav.Link>
                    <Nav.Link href="/aboutus" className="header-user-icon">
                        <GiRotaryPhone size={30} />
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
