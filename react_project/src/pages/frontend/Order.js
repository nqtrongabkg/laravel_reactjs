import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderService from '../../services/OrderService';
import { useUserContext } from '../../layouts/LayoutSite';
import { urlImage } from '../../config';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
const Order = () => {
    const [cart, setCart] = useState(null);
    const { user } = useUserContext();

    useEffect(() => {
        const fetchData = async () => {
            if (user && user.id) {
                try {
                    const response = await OrderService.cart(user.id);
                    if (response.status) {
                        setCart(response.cart);
                    } else {
                        console.log(response.message);
                    }
                } catch (error) {
                    console.error('Failed to fetch data:', error);
                }
            }
        };
        fetchData();
    }, [user]);

    const handlePlaceOrder = async () => {
        try {
            const response = await OrderService.createOrder(user.id);
            if (response.status) {
                toast.success(response.message);
                setCart(null);
            } else {
                toast.error("Đặt hàng không thành công");
                console.log("Đặt hàng không thành công");
            }
        } catch (error) {
            toast.error("Đặt hàng không thành công");
            console.error('Failed to place order:', error);
        }
    };

    return (
        <div className="container my-4 order-container">
            <ToastContainer />
            <div className="cart-title-box">
                <h1 className="cart-title">Giỏ hàng</h1>
                <Link to="/cart" className="btn btn-success checkout-btn">
                    Quản lý đơn hàng
                </Link>
            </div>

            {cart && cart.orderdetail.length > 0 ? (
                <div className="cart-items">
                    {cart.orderdetail.map((detail) => (
                        <div key={detail.id} className="cart-item">
                            <div className="row">
                                <div className="col-sm-2">
                                    <img src={urlImage + "product/" + detail.product.image} alt={detail.product.name} className="img-fluid cart-item-image" />
                                </div>
                                <div className="col-sm-5">
                                    <h5 className="cart-item-name">{detail.product.name}</h5>
                                    <p className="cart-item-detail">{detail.product.detail}</p>
                                    {/* <p className="cart-item-description">{detail.product.description}</p> */}
                                </div>
                                <div className="col-sm-3">
                                    <div className="cart-item-quantity">
                                        Số lượng:
                                        <span className="quantity">{detail.qty}</span>
                                    </div>
                                    <div className="cart-item-price">
                                        Giá:
                                        <span className="price"> {detail.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                                    </div>
                                </div>
                                {/* <div className="col-sm-2">
                                    <button className="btn btn-danger remove-item-btn">
                                        Remove
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center"></p>
            )}
            <div className="cart-title-box">
                <h1 className="cart-title"> </h1>
                <Button className="btn btn-success checkout-btn" onClick={handlePlaceOrder}>
                    Đặt hàng
                </Button>
            </div>
        </div>
    );
};

export default Order;