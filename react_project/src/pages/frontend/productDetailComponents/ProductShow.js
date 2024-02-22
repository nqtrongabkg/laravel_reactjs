import React, { useState } from 'react';
import { urlImage } from '../../../config';
import { Modal, Button, Form } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useUserContext } from '../../../layouts/LayoutSite';
import OrderService from '../../../services/OrderService';
// import { useParams } from 'react-router-dom';


const ProductShow = ({ product }) => {
    const { user } = useUserContext();
    // const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [qty, setQty] = useState(1);
    const [address, setAddress] = useState("");
    // const { product_id } = useParams();
    // Format the price to a currency format
    const formatPrice = (price) => {
        return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    };

    // Check if there is sale information
    const hasSale = product.product_sales && product.product_sales.length > 0;
    const salePrice = hasSale ? product.product_sales[0].pricesale : null;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCart = async () => {
        // console.log(user)
        // console.log('User ID:', user.id, 'Product ID:', product.id, 'qty:', qty);
        await OrderService.add({ "user": user, "product_id": product.id, "qty": qty, "address": address });
        handleClose();
        toast.success("Đã thêm vào giỏ");
    };


    return (
        <div className="container my-5">
            <ToastContainer />
            <div className="row">
                <div className="col-md-6">
                    <img src={`${urlImage}product/${product.image}`} alt={product.name} className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <h2 className="product-header">{product.name}</h2>
                    <p className={`product-card-price ${hasSale ? 'product-card-price-discounted' : ''}`}>
                        Giá bán: {formatPrice(product.price)}
                    </p>
                    {hasSale && (
                        <p className="product-card-pricesale">
                            Giá khuyến mãi: {formatPrice(salePrice)}
                        </p>
                    )}
                    <p className="product-detail">{product.detail}</p>
                    <p className="product-description">{product.description}</p>
                    <button className="btn btn-primary" onClick={handleShow}>
                        Thêm vào giỏ hàng
                    </button>
                    {/* Modal for adding to cart */}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add to Cart</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="productQuantity">
                                    <Form.Label>Số lượng</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={qty}
                                        onChange={(e) => setQty(e.target.value)}
                                        min="1"
                                    />
                                    <Form.Label>Địa chỉ nhận</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleAddToCart}>
                                Add to Cart
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default ProductShow;
