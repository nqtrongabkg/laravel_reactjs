import { useEffect, useState } from 'react';
import ProductService from '../../../services/ProductService';
import { urlImage } from '../../../config';
import LoadingSpinner from '../../../LoadingSpinner';
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrashAlt, FaTag } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProductIndex = () => {
    const [load, setLoad] = useState(0);
    const [products, setProducts] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    //getListProduct
    useEffect(function () {
        setIsLoading(true);
        (async function () {
            const result = await ProductService.index();
            setProducts(result.products);

            setIsLoading(false);
        })();
    }, [load])
    //deleteProduct
    const handleTrash = (id) => {
        (async function () {
            const result = await ProductService.trash(id);
            if (result.status === true) {
                setLoad(Date.now());
                toast.success(result.message);
            }
        })();
    }
    //status
    const handleStatus = (id) => {
        (async function () {
            const result = await ProductService.status(id);
            if (result.status === true) {
                setLoad(Date.now());
                toast.success(result.message);
            }
        })();
    }
    return (
        <div className="content">
            <ToastContainer/>
            <section className="content-header my-2">
                <h1 className="d-inline">Sản phẩm</h1>
                <Link to="/admin/product/create" className="btn-add">Thêm mới</Link>
                <div className="row mt-3 align-items-center">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <a href="/admin/product/trash">Thùng rác</a>
                        </button>
                    </div>
                </div>
                <div className="row mt-1 align-items-center">
                    <div className="col-md-8">
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
                                    <Link className="page-link">&laquo;</Link>
                                </li>
                                <li className="page-item">
                                    <Link className="page-link" to="#">1</Link>
                                </li>
                                <li className="page-item">
                                    <Link className="page-link" to="#">2</Link>
                                </li>
                                <li className="page-item">
                                    <Link className="page-link" to="#">3</Link>
                                </li>
                                <li className="page-item">
                                    <Link className="page-link" to="#">&raquo;</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
            <section className="content-body my-2">

                {isLoading ? <LoadingSpinner /> : ""}
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th style={{ width: "30px" }} className="text-center">#</th>
                            <th className="text-center" style={{ width: "130px" }}>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Tên danh mục</th>
                            <th>Tên thương hiệu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map(function (product, index) {
                            return (
                                <tr key={index} className="dataitem">
                                    <td className="text-center align-middle">
                                        <input type="checkbox" name="id[]" />
                                    </td>
                                    <td>
                                        <img src={urlImage + "product/" + product.image} className="img-fluid" alt="Hinh" />
                                    </td>
                                    <td>
                                        <div className="name">
                                            <Link to={'/admin/product/edit/' + product.id}>
                                                {product.name}
                                            </Link>
                                        </div>
                                        <div className="function_style">
                                            <button
                                                onClick={() => handleStatus(product.id)}
                                                className={product.status === 1 ? "border-0 px-1 text-success" : "border-0 px-1 text-danger"}>
                                                {product.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                            </button>
                                            <Link to="#" className="px-1 text-success">
                                            </Link>
                                            <Link to={'/admin/product/edit/' + product.id} className="px-1 text-primary">
                                                <FaEdit />
                                            </Link>
                                            <Link to={'/admin/product/show/' + product.id} className="px-1 text-info">
                                                <FaEye />
                                            </Link>
                                            <button onClick={() => handleTrash(product.id)} className="border-0 px-1 text-danger"><FaTrashAlt /></button>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {product.price}
                                        </div>
                                        <div className="function_style">

                                            <Link to={'/admin/product/storesale/' + product.id} className="px-1 text-info">
                                                <FaTag />
                                            </Link>
                                        </div>
                                    </td>
                                    <td>{product.category ? product.category.name : 'N/A'}</td>
                                    <td>{product.brand ? product.brand.name : 'N/A'}</td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </section>
        </div>
    );
};
export default ProductIndex;