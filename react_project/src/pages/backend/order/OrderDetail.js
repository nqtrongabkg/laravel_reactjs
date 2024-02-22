import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import OrderDetailService from './../../../services/OrderDetailService';
import { urlImage } from '../../../config';

export default function OrderDetail() {
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await OrderDetailService.getByOrderId(id);
                if (result.status) {
                    setData(result.orderdetails);
                }
            } catch (err) {
                console.log("Lỗi tải dữ liệu chi tiết đơn hàng: ", err);
            }
        };
        loadData();
    }, [id]);

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1>Chi tiết đơn hàng</h1>
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <button type="button" className="btn btn-warning">
                            <Link to="/admin/order/index">Về danh sách</Link>
                        </button>
                    </div>
                </div>
            </section>
            <section className="content-body my-2">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Giảm giá</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((orderDetail) => (
                            <tr key={orderDetail.id} className="datarow">
                                <td>{orderDetail.id}</td>
                                <td>
                                    <img
                                        style={{ width: '70px', height: '70px' }}
                                        src={urlImage + "product/" + orderDetail.product.image}
                                        alt={orderDetail.product.image}
                                    />
                                </td>
                                <td>{orderDetail.product.name}</td>
                                <td>{orderDetail.price}</td>
                                <td>{orderDetail.qty}</td>
                                <td>{orderDetail.discount || 'N/A'}</td>
                                <td>{orderDetail.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
