import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { urlImage } from '../../config';
import ProductService from '../../services/ProductService';
import BrandService from '../../services/BrandService';
import { Link, useParams } from 'react-router-dom';

const AllProductByBrand = () => {
    const [products, setProducts] = useState([]);
    const [brand, setBrand] = useState(null);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        console.log("Brand ID = ", id);

        const fetchData = async () => {
            setLoading(true);
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
                    // Fetch products by brand
                    const response = await ProductService.getByBrand(id);
                    if (response.status) {
                        setProducts(response.products);
                    } else {
                        setProducts([]);
                    }
                }

                // Fetch brands
                const brandResponse = await BrandService.index();
                if (brandResponse.status) {
                    setBrands(brandResponse.brands);
                } else {
                    setBrands([]);
                }

                // Fetch current brand
                if (id !== 'all') {
                    const currentBrandResponse = await BrandService.show(id);
                    setBrand(currentBrandResponse.brand);
                } else {
                    setBrand(null);
                }
            } catch (error) {
                console.error("Failed to load data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const formatPrice = (price) => {
        return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    };

    if (loading) {
        return <p>Loading...</p>; // You can replace this with a loading spinner or component
    }

    return (
        <div className="product-container">
            <h2 className="product-header">Sản phẩm {brand ? brand.name : 'theo danh mục'}</h2>

            {/* Render brands section */}
            <div className="brand-list">
                <h3 className='brand-list-header'>Chọn thương hiệu:</h3>
                <ul>
                    <li key="all">
                        <Link to={`/allproductbybrand/all`} className={id === 'all' ? 'active' : ''}>
                            Tất cả
                        </Link>
                    </li>
                    {brands.map((brandItem) => (
                        <li key={brandItem.id}>
                            <Link to={`/allproductbybrand/${brandItem.id}`} className={brandItem.id === +id ? 'active' : ''}>
                                {brandItem.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Render products section */}
            {products.length === 0 ? (
                <p>Không có sản phẩm {brand ? 'cho thương hiệu này' : 'trong danh mục này'}</p>
            ) : (
                <Row>
                    {/* Existing products map */}
                    {products.map((product, index) => (
                        <Col key={index} md={3} sm={6} className="mb-4">
                            <Link to={`/productdetail/${product.id}`} className="product-link">
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
            )}
        </div>
    );
};

export default AllProductByBrand;
