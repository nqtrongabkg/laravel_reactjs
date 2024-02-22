import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { urlImage } from '../../../config';
import ProductService from '../../../services/ProductService';
import { Link } from 'react-router-dom';


const ProductSimilar = ({ category_id }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getByCategory(category_id).then(response => {
            setProducts(response.products);
        }).catch(error => {
            console.error("Failed to load new products", error);
        });
    }, [category_id]);

    const formatPrice = (price) => {
        return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    };

    return (
        <div className="product-container">
            <h2 className="product-header">Sản phẩm tương tự</h2>
            <Row>
                {products.map((product, index) => (
                    <Col key={index} md={3} sm={6} className="mb-4">
                        {/* Replace the inner Link with a div or span */}
                        <div>
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
                                        {/* Remove the Link here */}
                                        <div className="btn btn-more-info">
                                            Xem sản phẩm
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );

};

export default ProductSimilar;
