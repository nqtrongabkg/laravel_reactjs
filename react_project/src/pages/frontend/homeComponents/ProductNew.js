import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { urlImage } from '../../../config';
import ProductService from '../../../services/ProductService';
import { Link } from 'react-router-dom';


const ProductNew = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Gọi API và lấy 8 sản phẩm mới
        ProductService.productnew(8).then(response => {
            setProducts(response.products);
        }).catch(error => {
            console.error("Failed to load new products", error);
        });
    }, []);

    const formatPrice = (price) => {
        return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    };

    return (
        <div className="product-container">
            <h2 className="product-header">Sản phẩm mới</h2>
            <Row>
                {products.map((product, index) => (
                    <Col key={index} md={3} sm={6} className="mb-4">
                        {/* Card is wrapped inside the Link */}
                        <Card className="product-card">
                            <Link to={`/productdetail/${product.id}`}>
                                <Card.Img variant="top" src={`${urlImage}product/${product.image}`} />
                            </Link>
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
                                {/* Separate Link for the button */}
                                <Link to={`/productdetail/${product.id}`} className="btn btn-more-info">
                                    Xem sản phẩm
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );

};

export default ProductNew;
