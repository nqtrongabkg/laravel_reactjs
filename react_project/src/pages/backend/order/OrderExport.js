/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import ProductService from '../../../services/ProductService';
import OrderService from '../../../services/OrderService';
// import OrderDetailService from '../../../services/OrderDetailService';
import { urlImage } from '../../../config';
import { toast } from 'react-toastify';

const OrderExport = () => {
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [perPage] = useState(8);
    const [totalNumberOfProducts, setTotalNumberOfProducts] = useState(0);
    const [qty, setQty] = useState(1);

    const [name, setName] = useState('');
    const [gender, setGender] = useState('N/N');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderResponse = await OrderService.getcartexport();
                if (orderResponse.status) {
                    setOrder(orderResponse.cart);
                } else {
                    console.log(orderResponse.message);
                }

                if (keyword.trim() === '') {
                    const productResponse = await ProductService.indexpagination(page, perPage);
                    setProducts(productResponse.products);
                    setTotalNumberOfProducts(productResponse.total);
                } else {
                    const productResponse = await ProductService.searchLikeName({ query: keyword });
                    setProducts(productResponse.products);
                    setTotalNumberOfProducts(productResponse.total);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, [page, keyword]);

    const totalPages = Math.ceil(totalNumberOfProducts / perPage);

    const handleChangeStatus = async () => {
        try {
            const response = await OrderService.changestatusorderexport();
            // console.log(response);
            if (response.status) {
                toast.success(response.message);

                // Fetch updated order data
                const updatedOrder = await OrderService.getcartexport();
                    setOrder(null);
                    setName("");
                    setEmail("");
                    setPhone("");
                    setAddress("");
                    setNote("");
            } else {
                console.log(response.message);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };


    const handleCreateOrder = async () => {
        try {
            const response = await OrderService.createOrderExport({
                delivery_name: name,
                delivery_gender: gender,
                delivery_email: email,
                delivery_phone: phone,
                delivery_address: address,
                note: note,
            });
            if (response.status) {
                toast.success(response.message);
                const updatedOrder = await OrderService.getcartexport();
                if (updatedOrder.status) {
                    setOrder(updatedOrder.cart);
                } else {
                    console.log(updatedOrder.message);
                }
            } else {
                console.log(response.message);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            await OrderService.addproducttocartexport({ product_id: productId, qty: qty });
            toast.success('Đã thêm vào giỏ');
            const updatedOrder = await OrderService.getcartexport();
            if (updatedOrder.status) {
                setOrder(updatedOrder.cart);
            } else {
                console.log(updatedOrder.message);
            }
        } catch (error) {
            console.error('Failed to add product to cart:', error);
        }
    };
    return (
        <>
            <div className="col my-2">
                <div className="col-md-5">
                    <label>Họ tên (*)</label>
                    <input
                        type="text"
                        name="name"
                        id='name'
                        className="form-control"
                        value={order ? order.delivery_name : name}
                        onChange={(e) => setName(e.target.value)}
                        readOnly={order ? true : false}
                    />
                </div>
                <div className="col-md-5">
                    <label>Email (*)</label>
                    <input
                        type="text"
                        name="email"
                        id='email'
                        className="form-control"
                        value={order ? order.delivery_email : email}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly={order ? true : false}
                    />
                </div>
                <div className="col-md-5">
                    <label>Điện thoại (*)</label>
                    <input
                        type="text"
                        name="phone"
                        id='phone'
                        className="form-control"
                        value={order ? order.delivery_phone : phone}
                        onChange={(e) => setPhone(e.target.value)}
                        readOnly={order ? true : false}
                    />
                </div>
                <div className="col-md">
                    <label>Địa chỉ (*)</label>
                    <input
                        type="text"
                        name="address"
                        id='address'
                        className="form-control"
                        value={order ? order.delivery_address : address}
                        onChange={(e) => setAddress(e.target.value)}
                        readOnly={order ? true : false}
                    />
                </div>
                <div className="col-md">
                    <label>Ghi chú</label>
                    <input
                        type="text"
                        name="note"
                        id="note"
                        className="form-control"
                        value={order ? order.note : note}
                        onChange={(e) => setNote(e.target.value)}
                        readOnly={order ? true : false}
                    />
                </div>
                <div className="col-md">
                    <div className="col-12 my-2">
                        {order ? (
                            <button type="button" className="btn btn-success" onClick={handleChangeStatus}>
                                Hoàn tất đơn hàng
                            </button>
                        ) : (
                            <button type="button" className="btn btn-success" onClick={handleCreateOrder}>
                                Tạo đơn
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th className="text-center" style={{ width: '140px' }}>
                                    Hình ảnh
                                </th>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order && order.orderdetail.map((orderItem) => (
                                <tr key={orderItem.id}>
                                    <td>
                                        <img src={urlImage + "product/" + orderItem.product.image} className="img-fluid" alt="Hinh" />
                                    </td>
                                    <td>{orderItem.product.name}</td>
                                    <td>{orderItem.price}</td>
                                    <td>
                                        {orderItem.qty}
                                    </td>
                                    <td>{orderItem.amount}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row my-3">
                <div className="col-12">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button onClick={() => setPage(1)}>Tìm kiếm</button>
                </div>
            </div>
            <nav aria-label="Page navigation example" className="d-flex justify-content-center">
                <ul className="pagination">
                    {/* Nút Trước */}
                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(page - 1)} disabled={page === 1} aria-label="Previous">
                            &laquo;
                        </button>
                    </li>

                    {/* Các nút số trang */}
                    {[...Array(totalPages).keys()].map((page) => (
                        <li key={page} className={`page-item ${page === page + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                                {page + 1}
                            </button>
                        </li>
                    ))}

                    {/* Nút Sau */}
                    <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(page + 1)} disabled={page === perPage} aria-label="Next">
                            &raquo;
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="row">
                <div className="col-12">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th className="text-center" style={{ width: '140px' }}>
                                    Hình ảnh
                                </th>
                                <th>Tên sản phẩm</th>
                                <th>Tên danh mục</th>
                                <th>Tên thương hiệu</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <img src={urlImage + "product/" + item.image} className="img-fluid" alt="Hinh" />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.category.name}</td>
                                    <td>{item.brand.name}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <input
                                            style={{ width: '60px' }}
                                            name="qty"
                                            type="number"
                                            onChange={(e) => setQty(e.target.value)}
                                            min="1"
                                        />
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-success btn-xs px-2"
                                            onClick={() => handleAddToCart(item.id)}
                                        >
                                            +
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default OrderExport;
