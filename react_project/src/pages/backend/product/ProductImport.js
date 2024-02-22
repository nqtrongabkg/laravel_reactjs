import { useEffect } from 'react';
import LoadingSpinner from '../../../LoadingSpinner';
import { toast , ToastContainer} from 'react-toastify';
import ProductService from '../../../services/ProductService';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { urlImage } from '../../../config';

const ProductImport = () => {
    const [load, setLoad] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(function () {
        setIsLoading(true);
        (async function () {
            const result = await ProductService.import('index');
            setProducts(result.productstores);
            setIsLoading(false);
        })();
    }, [load]);
    //
    const handleImportProductById = (id) => {
        setIsLoading(true);
        const qty = document.getElementById("qty" + id).value;
        const price = document.getElementById("price" + id).value;
        const productstore = {
            product_id: id,
            qty: qty,
            price: price,
        };
        (async function () {
            const result = await ProductService.storeImport(productstore);
            toast.success(result.message);
            setLoad(Date.now());
            setIsLoading(false);
        })();
    }
    return (
        <div className="content">
            <ToastContainer/>
            <section className="content-header my-2">
                <h1 className="d-inline">Nhập sản phẩm</h1>
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
                <table className="table table-bordered table-striped" id="mytable">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: "50px" }}>Hình</th>
                            <th>Tên sản phẩm</th>
                            <th>Tên danh mục</th>
                            <th>Tên thương hiệu</th>
                            <th>Số lượng</th>
                            <th>Số lượng nhập</th>
                            <th>Giá nhập</th>
                            <th></th>
                            <th className="text-center" style={{ width: "30px" }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map((product, index) => {
                            return (
                                <tr className="datarow" key={index}>
                                    <td>
                                        <img src={urlImage + "product/" + product.image} className="img-fluid" alt="Hinh" />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.category ? product.category.name : 'Null'}</td>
                                    <td>{product.brand ? product.brand.name : 'Null'}</td>
                                    <td>{product.product_stores ? product.product_stores.reduce((total, store) => total + store.qty, 0) : 'Null'}</td>
                                    <td>
                                        <input type="number" id={"qty" + product.id} style={{ width: 60 }} min="0" />
                                    </td>
                                    <td>
                                        <input type="number" id={"price" + product.id} step="1000" max={product.price} />
                                    </td>
                                    <td className="text-center">
                                        <button
                                            type="button"
                                            onClick={() => handleImportProductById(product.id)}
                                            className="btn btn-sm btn-success">
                                            <FaPlus />
                                        </button>
                                    </td>
                                    <td className='text-center'>{product.id}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default ProductImport;