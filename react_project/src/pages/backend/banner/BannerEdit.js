import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BannerService from '../../../services/BannerService';
import LoadingSpinner from '../../../LoadingSpinner';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BannerEdit = () => {
    const { id } = useParams();
    // const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [position, setPosition] = useState("");
    const [link, setLink] = useState("");
    const [status, setStatus] = useState(1);

    useEffect(() => {
        (async () => {
            try {
                console.log("call edt");
                const result = await BannerService.show(id);
                setName(result.banner.name);
                setDescription(result.banner.description);
                setPosition(result.banner.position);
                setLink(result.banner.link);
                setStatus(result.banner.status);
            } catch (error) {
                console.error('Error fetching banner data:', error);
            } finally {
                // Đã load dữ liệu xong, ẩn biểu tượng loading
                setLoading(false);
            }
        })();
    }, [id]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const image = document.getElementById("image");
        const banner = new FormData();
        banner.append("name", name);
        banner.append("description", description);
        banner.append("position", position);
        banner.append("link", link);
        banner.append("status", status);
        banner.append("image", image.files.length === 0 ? "" : image.files[0]);

        try {
            const result = await BannerService.update(banner, id);
            toast.success(result.message);
            // navigate("/admin/banner/index", { replace: true });
        } catch (error) {
            console.error('Error updating the banner:', error);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Cập nhật Banner</h1>
                    <div className="text-end">
                        <a href="/admin/banner/index" className="btn btn-sm btn-success">
                            <i className="fa fa-arrow-left"></i> Về danh sách
                        </a>
                    </div>
                </section>
                <section className="content-body my-2">
                    {loading && <LoadingSpinner />}
                    <div className="row">
                        <div className="col-md-9">
                            <div className="mb-3">
                                <label><strong>Tên banner (*)</strong></label>
                                <input type="text" onChange={(e) => { setName(e.target.value) }} value={name} className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label><strong>Position</strong></label>
                                <input type="text" value={position} onChange={(e) => { setPosition(e.target.value) }} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label><strong>Link</strong></label>
                                <input type="text" value={link} onChange={(e) => { setLink(e.target.value) }} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label><strong>Mô tả</strong></label>
                                <textarea onChange={(e) => { setDescription(e.target.value) }} value={description} className="form-control"></textarea>
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
                            
                        </div>
                    </div>

                </section>
            </div>
        </form>
    );
};
export default BannerEdit;