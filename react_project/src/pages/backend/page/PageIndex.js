import { useEffect, useState } from 'react';
import { urlImage } from '../../../config';
import LoadingSpinner from '../../../LoadingSpinner';
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';
import PostService from '../../../services/PostService';

const PageIndex = () => {
    const [posts, setPosts] = useState([]);
    const [load, setLoad] = useState(false);
    const [reload, setReload] = useState(0);
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await PostService.indexpage();
                setPosts(result.posts);
                setLoad(true);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [reload]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const image = document.getElementById("image");
        const post = new FormData();
        post.append("title", title);
        post.append("detail", detail);
        post.append("description", description);
        post.append("type", type);
        post.append("status", status);
        post.append("image", image.files.length === 0 ? "" : image.files[0]);

        try {
            const result = await PostService.store(post);
            toast.success(result.message);
            setReload(result.post.id);
        } catch (error) {
            console.error("Error storing post:", error);
            toast.error("Failed to store post");
        }
    };

    const handleStatus = async (id) => {
        try {
            const result = await PostService.status(id);
            setReload(Date.now());
            if (result) {
                toast.success(result.message);
            }
        } catch (error) {
            console.error("Error changing status:", error);
            toast.error("Error changing status");
        }
    };

    const handleTrash = async (id) => {
        try {
            const result = await PostService.trash(id);
            if (result.status) {
                setReload(Date.now());
                toast.success(result.message);
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.error("Error deleting post");
        }
    };

    return (
        <>
            <section className="hdl-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="content">
                                <section className="content-header my-2">
                                    <h1 className="d-inline">Trang đơn</h1>
                                    <hr style={{ border: 'none' }} />
                                </section>
                                <section className="content-body my-2">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Tên bài viết (*)</strong>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        id="name"
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        placeholder="Nhập tiêu đề bài viết"
                                                        className="form-control"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Mô tả</strong></label>
                                                    <textarea
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        name="description"
                                                        value={description}
                                                        rows="3"
                                                        className="form-control"
                                                        placeholder="Mô tả"
                                                    ></textarea>
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Chi tiết</strong></label>
                                                    <textarea
                                                        onChange={(e) => setDetail(e.target.value)}
                                                        name="detail"
                                                        value={detail}
                                                        rows="4"
                                                        className="form-control"
                                                        placeholder="Chi tiết"
                                                    ></textarea>
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Hình ảnh</strong></label>
                                                    <input
                                                        type="file"
                                                        id="image"
                                                        name="image"
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Loại bài viết</strong>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="type"
                                                        id="type"
                                                        onChange={(e) => setType(e.target.value)}
                                                        placeholder="Nhập loại bài viết"
                                                        className="form-control"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Trạng thái</strong>
                                                    </label>
                                                    <select
                                                        onChange={(e) => setStatus(e.target.value)}
                                                        value={status}
                                                        className="form-select"
                                                    >
                                                        <option value="1">Xuất bản</option>
                                                        <option value="2">Chưa xuất bản</option>
                                                    </select>
                                                </div>
                                                
                                                <div className="mb-3 text-end">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-success"
                                                        name="THEM"
                                                    >
                                                        <i className="fa fa-save"></i> Lưu[Thêm]
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="row mt-3 align-items-center">
                                                <div className="col-12">
                                                    <button type="button" class="btn btn-info">
                                                        <a href="/admin/page/trash">Thùng rác</a>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="row my-2 align-items-center">
                                                <div className="col-md-6">
                                                    <select name="" className="d-inline me-1">
                                                        <option value="">Hành động</option>
                                                        <option value="">Bỏ vào thùng rác</option>
                                                    </select>
                                                    <button className="btnapply">Áp dụng</button>
                                                </div>
                                                <div className="col-md-6 text-end">
                                                    <input type="text" className="search d-inline" />
                                                    <button className="btnsearch d-inline">Tìm kiếm</button>
                                                </div>
                                            </div>
                                            {!load && <LoadingSpinner />}
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center" style={{ width: '30px' }}>
                                                            <input type="checkbox" id="checkboxAll" />
                                                        </th>
                                                        <th className="text-center" style={{ width: '90px' }}>Hình ảnh</th>
                                                        <th>Tên bài viết</th>
                                                        <th>Mô tả</th>
                                                        <th className="text-center" style={{ width: '30px' }}>ID</th>
                                                    </tr>
                                                </thead>

                                                <tbody>

                                                    {posts && posts.length > 0 &&
                                                        posts.map((post, index) => {
                                                            return (
                                                                <tr className="datarow" key={index}>
                                                                    <td className="text-center">
                                                                        <input type="checkbox" />
                                                                    </td>
                                                                    <td>
                                                                        <img className="img-fluid"
                                                                            src={urlImage + "post/" + post.image}
                                                                            alt={post.image} />
                                                                    </td>
                                                                    <td>
                                                                        <div className="name">
                                                                            <a href="#nt">
                                                                                {post.title}
                                                                            </a>
                                                                        </div>
                                                                        <div className="function_style">
                                                                            <button>
                                                                                <a href={`/admin/page/edit/${post.id}`} className="px-1 text-success">
                                                                                    <FaEdit />
                                                                                </a>
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleStatus(post.id)}
                                                                                className={post.status === 1 ? "text-success" : "text-danger"}
                                                                            >
                                                                                {post.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                                                            </button>
                                                                            <button>
                                                                                <a href="post_show.html" className="px-1 text-info">
                                                                                    <FaEye />
                                                                                </a>
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleTrash(post.id)}
                                                                                className="btn-none text-danger">
                                                                                <FaTrash />
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                    <td>{post.description}</td>
                                                                    <td className="text-center">{post.id}</td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default PageIndex;
