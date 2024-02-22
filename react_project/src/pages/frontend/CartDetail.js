import React, { useState, useEffect } from "react";
import OrderDetailService from "../../services/OrderDetailService";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";

const CartDetail = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        OrderDetailService.getByOrderId(id)
            .then((response) => {
                console.log(response.orderDetails);
                setOrderDetails(response.orderdetails);
            })
            .catch((error) => {
                console.error("Failed to fetch orders:", error);
            });
    }, [id]);

    return (
        <div>
            <h1>Order Detail</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product ID</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Discount</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetails.map((orderDetail) => (
                        <tr key={orderDetail.id}>
                            <td>{orderDetail.id}</td>
                            <td>{orderDetail.product_id}</td>
                            <td>{orderDetail.price}</td>
                            <td>{orderDetail.qty}</td>
                            <td>{orderDetail.discount || "N/A"}</td>
                            <td>{orderDetail.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CartDetail;
