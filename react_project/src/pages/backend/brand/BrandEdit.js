import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BrandService from '../../../services/BrandService';
import LoadingSpinner from '../../../LoadingSpinner';
import {toast} from 'react-toastify';

const BrandEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [sort_order, setSortOrder] = useState(1);
    const [status, setStatus] = useState(1);

    useEffect(() => {
        (async () => {
            try {
                const result = await BrandService.show(id);
                setName(result.brand.name);
                setSlug(result.brand.slug);
                setDescription(result.brand.description);
                setSortOrder(result.brand.sort_order);
                setStatus(result.brand.status);
            } catch (error) {
                console.error('Error fetching brand data:', error);
            } finally {
                // Đã load dữ liệu xong, ẩn biểu tượng loading
                setLoading(false);
            }
        })();
    }, [id]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const image = document.getElementById("image");
        const brand = new FormData();
        brand.append("name", name);
        brand.append("slug", slug);
        brand.append("description", description);
        brand.append("sort_order", sort_order);
        brand.append("status", status);
        brand.append("image", image.files.length === 0 ? "" : image.files[0]);

        try {
            const result = await BrandService.update(brand, id);
            toast.success(result.message);
            navigate("/admin/brand/index", { replace: true });
        } catch (error) {
            console.error('Error updating the brand:', error);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Cập nhật Thương hiệu</h1>
                    <div className="text-end">
                        <a href="/admin/brand/index" className="btn btn-sm btn-success">
                            <i className="fa fa-arrow-left"></i> Về danh sách
                        </a>
                    </div>
                </section>
                <section className="content-body my-2">
                {loading && <LoadingSpinner/>}
                    <div className="row">
                        <div className="col-md-9">
                            <div className="mb-3">
                                <label><strong>Tên thương hiệu (*)</strong></label>
                                <input type="text" onChange={(e) => { setName(e.target.value) }} value={name} className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label><strong>Slug</strong></label>
                                <input type="text" value={slug} onChange={(e) => { setSlug(e.target.value) }} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label><strong>Mô tả</strong></label>
                                <textarea  onChange={(e) => { setDescription(e.target.value) }} value={description} className="form-control"></textarea>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="box-container mt-4 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Đăng</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <p>Chọn trạng thái đăng</p>
                                    <select name="status" className="form-control" 
                                    onChange={(e) => { setStatus(e.target.value) }}
                                    value={status}>
                                        <option value="1">Xuất bản</option>
                                        <option value="2">Chưa xuất bản</option>
                                    </select>
                                </div>
                                <div className="box-footer text-end px-2 py-3">
                                    <button type="submit" className="btn btn-success btn-sm text-end">
                                        <i className="fa fa-save" aria-hidden="true"></i> Đăng
                                    </button>
                                </div>
                            </div>
                            <div className="box-container mt-2 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Hình đại diện</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <input type="file" id='image' name="image" className="form-control" />
                                </div>
                            </div>
                            <div className="box-container mt-2 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Thứ tự</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <select name="sort_order" className="form-control" 
                                    onChange={(e) => { setSortOrder(e.target.value) }}
                                    value={sort_order}>
                                        <option value="1">Trước</option>
                                        <option value="2">sau</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </form>
    );
};

export default BrandEdit;
