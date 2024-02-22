import { useEffect, useState } from 'react';
import { urlImage } from '../../../config';
import LoadingSpinner from '../../../LoadingSpinner';
import { FaAngleDoubleUp, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';
import PostService from './../../../services/PostService';


const PostTrash = () => {
    const [posts, setPosts] = useState([]);
    const [load, setLoad] = useState(false);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await PostService.indextrash();
                setPosts(result.posts);
                setLoad(true);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [reload]);

    const handTrash = async (id) => {
        try {
            const result = await PostService.trash(id);
            if (result) {
                toast.success(result.message);
                setReload(Date.now());
            }
        } catch (error) {
            console.error("Error changing status:", error);
            toast.error("Error changing status");
        }
    };

    const handDelete = async (id) => {
        try {
            const result = await PostService.destroy(id);
            if(result.status){
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
                                    <h1 className="d-inline">Thùng rát bài Viết</h1>
                                    <hr style={{ border: 'none' }} />
                                </section>
                                <section className="content-body my-2">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row mt-3 align-items-center">
                                                <div className="col-12">
                                                    <button type="button" class="btn btn-info">
                                                        <a href="/admin/post/index">Trở về danh sách</a>
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
                                                                            <button
                                                                                onClick={() => handTrash(post.id)}
                                                                                className="btn-none text-danger">
                                                                                <FaAngleDoubleUp />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handDelete(post.id)}
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
export default PostTrash;
