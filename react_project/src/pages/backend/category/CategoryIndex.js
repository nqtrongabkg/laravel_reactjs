import { useEffect, useState } from 'react';
import CategoryService from '../../../services/CategoryService';
import { urlImage } from '../../../config';
import LoadingSpinner from '../../../LoadingSpinner';
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';

const CategoryIndex = () => {
    const [categories, setCategories] = useState([]);
    const [load, setLoad] = useState(false);
    const [reload, setReload] = useState(0);
    // 
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [sort_order, setSortOrder] = useState(1);
    const [status, setStatus] = useState(1);
    // 
    useEffect(() => {
        (async () => {
            const result = await CategoryService.index();
            setCategories(result.categories);
            setLoad(true);
        })();
    }, [reload]);

    //xử lý thêm brand
    const handleSubmit = (e) => {
        e.preventDefault();
        const image = document.getElementById("image");
        const category = new FormData();
        category.append("name", name);
        category.append("description", description);
        category.append("sort_order", sort_order);
        category.append("status", status);
        category.append("image", image.files.length === 0 ? "" : image.files[0]);

        (async () => {
            const result = await CategoryService.store(category);
            if(result.status){
                toast.success(result.message);
            }
            setReload(result.category.id);
        })();
    };

    const trash = (id) => {
        (async () => {
            console.log(id);
            const result = await CategoryService.trash(id);
            if(result){
                setReload(Date.now());
                toast.success(result.message);
            }
        })();
    }

    const handleStatus = (id) => {
        (async () => {
            try {
                const result = await CategoryService.status(id);
                setReload(Date.now());
                if (result) {
                    toast.success(result.message);
                }
            } catch (error) {
                console.error("Error changing status:", error);
                toast.error("Error changing status");
            }
        })();
    };


    return (
        <>
            <section className="hdl-content">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-md-12">
                            {/* <!--CONTENT  --> */}
                            <div className="content">
                                <section className="content-header my-2">
                                    <h1 className="d-inline">Danh mục sản phẩm</h1>
                                    <hr style={{ border: 'none' }} />
                                </section>
                                <section className="content-body my-2">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Tên danh mục (*)</strong>
                                                    </label>
                                                    <input type="text"
                                                        name="name" id="name"
                                                        onChange={(e) => { setName(e.target.value) }}
                                                        placeholder="Nhập tên danh mục"
                                                        className="form-control"
                                                        required />
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Mô tả</strong></label>
                                                    <textarea
                                                        onChange={(e) => { setDescription(e.target.value) }}
                                                        name="description"
                                                        value={description}
                                                        rows="4"
                                                        className="form-control"
                                                        placeholder="Mô tả">
                                                    </textarea>
                                                </div>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Sắp xếp</strong>
                                                    </label>
                                                    <select
                                                        onChange={(e) => setSortOrder(e.target.value)}
                                                        value={sort_order}
                                                        className="form-select"
                                                    >
                                                        <option value="1">Vị trí 1</option>
                                                        <option value="2">Vị trí 2</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Hình đại diện</strong></label>
                                                    <input type="file" id="image" name="image" className="form-control" />
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
                                                    <button type="submit" className="btn btn-success" name="THEM">
                                                        <i className="fa fa-save"></i> Lưu[Thêm]
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="row mt-3 align-items-center">
                                                <div className="col-12">
                                                    <button type="button" className="btn btn-warning">
                                                        <a href="/admin/category/trash">Thùng rác</a>
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
                                                        <th>Tên danh mục</th>
                                                        <th>Tên slug</th>
                                                        <th className="text-center" style={{ width: '30px' }}>ID</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    
                                                    {categories && categories.length > 0 &&
                                                        categories.map((category, index) => {
                                                            return (
                                                                    <tr className="datarow" key={index}>
                                                                        <td className="text-center">
                                                                            <input type="checkbox" />
                                                                        </td>
                                                                        <td>
                                                                            <img className="img-fluid"
                                                                                src={urlImage + "category/" + category.image}
                                                                                alt={category.image} />
                                                                        </td>
                                                                        <td>
                                                                            <div className="name">
                                                                                <a href="#nt">
                                                                                    {category.name}
                                                                                </a>
                                                                            </div>
                                                                        <div className="function_style">
                                                                            <button>
                                                                                <a href={`/admin/category/edit/${category.id}`} className="px-1 text-success">
                                                                                    <FaEdit />
                                                                                </a>
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleStatus(category.id)}
                                                                                className={category.status === 1 ? "text-success" : "text-danger"}
                                                                            >
                                                                                {category.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                                                            </button>
                                                                            <button>
                                                                                <a href="brand_show.html" className="px-1 text-info">
                                                                                    <FaEye />
                                                                                </a>
                                                                            </button>
                                                                            <button
                                                                                onClick={() => trash(category.id)}
                                                                                className="btn-none text-danger">
                                                                                <FaTrash />
                                                                            </button>
                                                                        </div>
                                                                        </td>
                                                                        <td>{category.slug}</td>
                                                                        <td className="text-center">{category.id}</td>
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
                            {/* <!--END CONTENT--> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default CategoryIndex;