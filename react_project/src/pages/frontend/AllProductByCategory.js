import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { urlImage } from '../../config';
import ProductService from '../../services/ProductService';
import CategoryService from '../../services/CategoryService';
import { Link, useParams } from 'react-router-dom';

const AllProductByCategory = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        console.log("Category ID = ", id);

        const fetchData = async () => {
            try {
                if (id === 'all') {
                    // Fetch all products
                    const response = await ProductService.index();
                    if (response.status) {
                        setProducts(response.products);
                    } else {
                        setProducts([]);
                    }
                } else {
                    // Fetch products by category
                    const response = await ProductService.getByCategory(id);
                    if (response.status) {
                        setProducts(response.products);
                    } else {
                        setProducts([]);
                    }
                }

                // Fetch categories
                const categoryResponse = await CategoryService.index();
                if (categoryResponse.status) {
                    setCategories(categoryResponse.categories);
                } else {
                    setCategories([]);
                }

                // Fetch current category
                if (id !== 'all') {
                    const currentCategoryResponse = await CategoryService.show(id);
                    setCategory(currentCategoryResponse.category);
                } else {
                    setCategory(null);
                }
            } catch (error) {
                console.error("Failed to load data", error);
            }
        };

        fetchData();
    }, [id]);

    const formatPrice = (price) => {
        return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    };

    return (
        <div className="product-container">
            <h2 className="product-header">Sản phẩm {category ? category.name : 'theo danh mục'}</h2>
            {/* Render category section */}
            <div className="brand-list">
                <h3 className='brand-list-header'>Chọn thương danh mục:</h3>
                <ul>
                    <li key="all">
                        <Link to={`/allproductbycategory/all`} className={id === 'all' ? 'active' : ''}>
                            Tất cả
                        </Link>
                    </li>
                    {categories.map((categoryItem) => (
                        <li key={categoryItem.id}>
                            <Link to={`/allproductbycategory/${categoryItem.id}`} className={categoryItem.id === +id ? 'active' : ''}>
                                {categoryItem.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Render products section */}
            <Row>
                {/* Existing products map */}
                {products.map((product, index) => (
                    <Col key={index} md={3} sm={6} className="mb-4">
                        <Link to={`/productdetail/${product.id}`}>
                            <Card className="product-card">
                                <Card.Img variant="top" src={`${urlImage}product/${product.image}`} />
                                <Card.Body className="product-card-body">
                                    <Card.Title className="product-card-title">{product.name}</Card.Title>
                                    <div className="product-card-text-container">
                                        <Card.Text className={`product-card-price ${product.sale ? 'product-card-price-discounted' : ''}`}>
                                            Giá bán: {formatPrice(product.price)}
                                        </Card.Text>
                                        {product.sale && (
                                            <Card.Text className="product-card-pricesale">
                                                Giảm còn: {formatPrice(product.sale.pricesale)}
                                            </Card.Text>
                                        )}
                                    </div>
                                    <div className="btn btn-more-info">
                                        Xem sản phẩm
                                    </div>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default AllProductByCategory;
