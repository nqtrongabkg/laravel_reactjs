import React, { useEffect, useState } from "react";
import { urlImage } from '../../../config';
import LoadingSpinner from '../../../LoadingSpinner';
import { ToastContainer, toast } from "react-toastify";
import ProductService from '../../../services/ProductService';
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";


const ProductSale = () => {
    const [load, setLoad] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(function () {
        setIsLoading(true);
        (async function () {
            const result = await ProductService.sale('index');
            setProducts(result.productsales);
            setIsLoading(false);
        })();

    }, [load]);

    const handleDelete = (id) => {
        (async function () {
            const result = await ProductService.destroySale(id);
            if (result.status === true) {
                setLoad(Date.now());
                toast.success(result.message);
            }
        })();
    }

    console.log(products);
    return (
        <div className="content">
            <ToastContainer />
            <section className="content-header my-2">
                <h1 className="d-inline">Khuyến mãi</h1>
                <div className="row mt-3 align-items-center">
                    <div className="col-12 text-end">
                        <input type="text" className="search d-inline" />
                        <button className="d-inline btnsearch">Tìm kiếm</button>
                    </div>
                </div>
                <div className="row mt-1 align-items-center">
                    <div className="col-md-8">
                        <select name="" className="d-inline me-1">
                            <option value="">Hành động</option>
                            <option value="">Bỏ vào thùng rác</option>
                        </select>
                        <button className="btnapply">Áp dụng</button>
                        <select name="" className="d-inline me-1">
                            <option value="">Tất cả danh mục</option>
                        </select>
                        <select name="" className="d-inline me-1">
                            <option value="">Tất cả thương hiệu</option>
                        </select>
                        <button className="btnfilter">Lọc</button>
                    </div>
                    <div className="col-md-4 text-end">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination pagination-sm justify-content-end">
                                <li className="page-item disabled">
                                    <a className="page-link" href="#nqt">&laquo;</a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#nqt">1</a></li>
                                <li className="page-item"><a className="page-link" href="#nqt">2</a></li>
                                <li className="page-item"><a className="page-link" href="#nqt">3</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#nqt">&raquo;</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
            <section className="content-body my-2">
                {isLoading ? <LoadingSpinner /> : ""}
                <table className="table table-bordered" id="mytable2">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: '30px' }}>
                                <input type="checkbox" id="checkboxAll" />
                            </th>
                            <th className="text-center" style={{ width: '90px' }}>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá bán</th>
                            <th>Ngày BĐ</th>
                            <th>Ngày kết thúc</th>
                            <th>Giá sale</th>
                            <th>Số lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr className="datarow" key={product.id}>
                                <td className="text-center">
                                    <input type="checkbox" id={`checkId-${product.id}`} />
                                </td>
                                <td>
                                    <img src={urlImage + "product/" + product.image} className="img-fluid" alt="Hinh" />
                                </td>
                                <td>
                                    <div className="name">{product.name}</div>
                                    <div className="function_style">

                                        <Link to="#" className="px-1 text-success">
                                        </Link>
                                        <Link to={'/admin/product/editsale/' + product.id} className="px-1 text-primary">
                                            <FaEdit />
                                        </Link>
                                        <button onClick={() => handleDelete(product.id)} className="border-0 px-1 text-danger"><FaTrashAlt /></button>
                                    </div>
                                </td>
                                <td>{product.price}</td>
                                <td>{product.date_begin}</td>
                                <td>{product.date_end}</td>
                                <td>{product.pricesale}</td>
                                <td>{product.qty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </section>
        </div>
    );
};

export default ProductSale;