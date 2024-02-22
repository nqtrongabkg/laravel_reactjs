import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ProductService from '../../../services/ProductService';
import BrandService from "../../../services/BrandService"
import CategoryService from "../../../services/CategoryService"
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const ProductCreate = () => {
    const navigate = useNavigate();
    const [categorys, setCategorys] = useState([]);
    const [brands, setBrands] = useState([]);
    const [name, setName] = useState('');
    const [categoryid, setCategoryId] = useState(null);
    const [brandid, setBrandId] = useState(null);
    const [detail, setDetail] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState(2);
    const [description, setDescription] = useState('');

    //category-brand
    useEffect(function () {
        (async function () {
            const result_category = await CategoryService.index('index');
            const result_brand = await BrandService.index('index');
            setCategorys(result_category.categories);
            setBrands(result_brand.brands);
        })();
    }, [])
    //store
    const handleSubmit = (event) => {
        event.preventDefault();
        const image = document.querySelector("#image");
        var product = new FormData();
        product.append('name', name);
        product.append('detail', detail);
        product.append('category_id', categoryid);
        product.append('brand_id', brandid);
        product.append('price', price);
        product.append("description", description);
        product.append('status', status);
        product.append("image", (image.files.length === 0) ? "" : image.files[0]);
        (async function () {
            const result = await ProductService.store(product);
            if (result.status === true) {
                toast.success(result.message);
                navigate('/admin/product/index', { replace: true });
            }
        })();
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Thêm sản phẩm</h1>
                    <div className="mt-1 text-end">
                        <Link to="/admin/product/index" className="btn btn-sm btn-info mx-1">
                            <FaArrowLeft /> Về danh sách
                        </Link>
                    </div>
                </section>
                <section className="content-body my-2">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="mb-3">
                                <label><strong>Tên sản phẩm (*)</strong></label>
                                <input type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nhập tên sản phẩm" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label><strong>Chi tiết (*)</strong></label>
                                <textarea
                                    value={detail}
                                    onChange={(e) => setDetail(e.target.value)}
                                    placeholder="Nhập chi tiết sản phẩm" rows="5"
                                    className="form-control"></textarea>
                            </div>
                            <div className="mb-3">
                                <label><strong>Mô tả</strong></label>
                                <textarea value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="form-control"></textarea>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="box-container mt-4 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Đăng</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="form-select">
                                        <option value="1">Xuất bản</option>
                                        <option value="2">Chưa xuất bản</option>
                                    </select>
                                </div>
                                <div className="box-footer text-end px-2 py-2">
                                    <button type="submit" className="btn btn-sm btn-success" name="THEM">
                                        <FaSave /> Lưu[Thêm]
                                    </button>
                                </div>
                            </div>
                            <div className="box-container mt-2 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Danh mục(*)</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <select
                                        onChange={(e) => setCategoryId(e.target.value)}
                                        className="form-select">
                                        <option value="">Chọn danh mục</option>
                                        {categorys && categorys.map((cat, index) => {
                                            return (<option key={index} value={cat.id}>{cat.name}</option>);
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="box-container mt-2 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Thương hiệu(*)</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <select
                                        onChange={(e) => setBrandId(e.target.value)}
                                        className="form-select">
                                        <option value="">Chọn thương hiệu</option>
                                        {brands && brands.map((bra, index) => {
                                            return (<option key={index} value={bra.id}>{bra.name}</option>);
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="box-container mt-2 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Giá bán</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <div className="mb-3">
                                        <label><strong>Giá bán (*)</strong></label>
                                        <input type="number"
                                            min="10000"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="box-container mt-2 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Hình đại diện(*)</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <input type="file" id="image" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </form>
    );
}
export default ProductCreate;