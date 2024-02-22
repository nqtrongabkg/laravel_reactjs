import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../LoadingSpinner';
import { toast } from 'react-toastify';
import PostService from '../../../services/PostService';

const PageEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({
        id: null,
        title: '',
        slug: '',
        detail: '',
        description: '',
        type: '',
        image: null,
        status: 1,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postResponse = await PostService.show(id);
                setPost(postResponse.post);
            } catch (error) {
                console.error('Error fetching post data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', post.title);
        formData.append('slug', post.slug);
        formData.append('detail', post.detail);
        formData.append('description', post.description);
        if (post.image) {
            formData.append('image', post.image);
        }
        formData.append('type', post.type);
        formData.append('status', post.status);

        try {
            const result = await PostService.update(formData, id);
            toast.success(result.message);
            navigate('/admin/page/index', { replace: true });
        } catch (error) {
            console.error('Error updating the post:', error);
            toast.error('Cập nhật thất bại, vui lòng nhập đầy đủ nội dung!');
        }
    };

    const handleInputChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setPost({ ...post, image: e.target.files[0] });
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Cập nhật trang đơn</h1>
                    <div className="text-end">
                        <a href="/admin/page/index" className="btn btn-sm btn-success">
                            <i className="fa fa-arrow-left"></i> Về danh sách
                        </a>
                    </div>
                </section>
                <section className="content-body my-2">
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="row">
                            <div className="col-md-9">
                                <div className="mb-3">
                                    <label>
                                        <strong>Tiêu đề (*)</strong>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={post.title}
                                        className="form-control"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>
                                        <strong>Slug</strong>
                                    </label>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={post.slug}
                                        className="form-control"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>
                                        <strong>Mô tả</strong>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={post.description}
                                        className="form-control"
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label>
                                        <strong>Loại</strong>
                                    </label>
                                    <input
                                        type="text"
                                        name="type"
                                        value={post.type}
                                        className="form-control"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                
                                <div className="box-container mt-2 bg-white">
                                    <div className="box-header py-1 px-2 border-bottom">
                                        <strong>Đăng</strong>
                                    </div>
                                    <div className="box-body p-2 border-bottom">
                                        <p>Chọn trạng thái đăng</p>
                                        <select
                                            name="status"
                                            className="form-control"
                                            onChange={handleInputChange}
                                            value={post.status}
                                        >
                                            <option value="1">Xuất bản</option>
                                            <option value="2">Chưa xuất bản</option>
                                        </select>
                                    </div>
                                    <div className="box-footer text-end px-2 py-3">
                                        <button
                                            type="submit"
                                            className="btn btn-success btn-sm text-end"
                                        >
                                            <i className="fa fa-save" aria-hidden="true"></i> Đăng
                                        </button>
                                    </div>
                                </div>
                                <div className="box-container mt-2 bg-white">
                                    <div className="box-header py-1 px-2 border-bottom">
                                        <strong>Hình đại diện</strong>
                                    </div>
                                    <div className="box-body p-2 border-bottom">
                                        <input
                                            type="file"
                                            name="image"
                                            className="form-control"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </form>
    );
};

export default PageEdit;
