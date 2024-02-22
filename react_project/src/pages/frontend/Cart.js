import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OrderService from '../../services/OrderService';
import { useUserContext } from '../../layouts/LayoutSite';

const Cart = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useUserContext();

    useEffect(() => {
        if (user && user.id) {
            OrderService.getByUserId(user.id)
                .then(response => {
                    if (response.orders && response.status) {
                        // Format the dates here
                        setOrders(response.orders);
                    } else {
                        console.log(response.message);
                    }
                })
                .catch(error => {
                    console.error('Failed to fetch orders:', error);
                });
        }
    }, [user]);

    const formattedDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', options);
    };
    return (
        <div className="main-content">
            <div className="cart-container">
                <h1 className="cart-title">Quản lý đơn hàng</h1>
                <div className="cart-orders-list" >
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div key={order.id} className="cart-order-card">
                                <div className="cart-order-header">
                                    <Link to={`/cartdetail/${order.id}`} className="order-link">
                                        <h5>Ngày đặt: {formattedDate(order.created_at)}</h5>
                                    </Link>
                                </div>
                                <div className="cart-order-body">
                                    <p>Tên người nhận: {order.delivery_name}</p>
                                    <p>Email người nhận: {order.delivery_email}</p>
                                    <p>Số điện thoại người nhận: {order.delivery_phone}</p>
                                    <p>Địa chỉ nhận đơn: {order.delivery_address}</p>
                                    {/* Additional order details here */}
                                </div>
                                <div className="cart-order-footer">
                                    <Link to={`/cartdetail/${order.id}`} className="btn btn-primary btn-details">
                                        Chi tiết
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="cart-empty-message">Chưa có đơn hàng nào được đặt.</p>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Cart;
