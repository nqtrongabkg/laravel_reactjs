import React, { useState, useEffect } from 'react';
import { urlImage } from '../../config';
import ProductService from '../../services/ProductService';
import CategoryService from '../../services/CategoryService';
import BrandService from '../../services/BrandService';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
const AllProduct = () => {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);
    const [totalNumberOfProducts, setTotalNumberOfProducts] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await ProductService.indexpagination(currentPage, productsPerPage);
                setProducts(result.products);
                setTotalNumberOfProducts(result.total);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [currentPage, productsPerPage]);

    const totalPages = Math.ceil(totalNumberOfProducts / productsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const formatPrice = (price) => {
        return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    };

    return (
        <div className="product-container">
            <h2 className="product-header">Tất cả sản phẩm</h2>
            <Row>
                {products.map((product, index) => (
                    <Col key={index} md={3} sm={6} className="mb-4">
                        {/* Card component without wrapping Link */}
                        <Card className="product-card">
                            <Link to={`/productdetail/${product.product_id}`}>
                                <Card.Img variant="top" src={`${urlImage}product/${product.image}`} />
                            </Link>
                            <Card.Body className="product-card-body">
                                <Card.Title className="product-card-title">{product.name}</Card.Title>
                                <div className="product-card-text-container">
                                    <Card.Text className={`product-card-price ${product.pricesale ? 'product-card-price-discounted' : ''}`}>
                                        Giá bán: {formatPrice(product.price)}
                                    </Card.Text>
                                    {product.pricesale && (
                                        <Card.Text className="product-card-pricesale">
                                            Giảm còn: {formatPrice(product.pricesale)}
                                        </Card.Text>
                                    )}
                                </div>
                                {/* Separate Link for the button */}
                                <Link to={`/productdetail/${product.product_id}`} className="btn btn-more-info">
                                    Xem sản phẩm
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                <nav aria-label="Page navigation example" className="d-flex justify-content-center">
                    <ul className="pagination">
                        {/* Nút Trước */}
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous">
                                &laquo;
                            </button>
                        </li>

                        {/* Các nút số trang */}
                        {[...Array(totalPages).keys()].map((page) => (
                            <li key={page} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                                    {page + 1}
                                </button>
                            </li>
                        ))}

                        {/* Nút Sau */}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next">
                                &raquo;
                            </button>
                        </li>
                    </ul>
                </nav>
            </Row>
        </div>
    );
};

export default AllProduct;