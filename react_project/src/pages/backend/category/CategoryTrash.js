import { useEffect, useState } from 'react';
import CategoryService from '../../../services/CategoryService';
import { urlImage } from '../../../config';
import LoadingSpinner from '../../../LoadingSpinner';
import { FaAngleDoubleUp, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';

const CategoryTrash = () => {
    const [categories, setCategories] = useState([]);
    const [load, setLoad] = useState(false);
    const [reload, setReload] = useState(0);
    // 
    useEffect(() => {
        (async () => {
            const result = await CategoryService.indextrash();
            setCategories(result.categories);
            setLoad(true);
        })();
    }, [reload]);

    const handDelete = (id) => {
        (async () => {
            // console.log(id);
            const result = await CategoryService.destroy(id);
            if(result.status){
                toast.success(result.message);
            }
            setReload(result.category.id)
        })();
    }

    const handTrash = (id) => {
        (async () => {
            // console.log(id);
            const result = await CategoryService.trash(id);
            if (result.status) {
                toast.success(result.message);
            }
            setReload(result.category.id)
        })();
    }


    return (
        <>
            <section className="hdl-content">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-md-12">
                            {/* <!--CONTENT  --> */}
                            <div className="content">
                                <section className="content-header my-2">
                                    <h1 className="d-inline">Thùng rác danh mục sản phẩm</h1>
                                    <hr style={{ border: 'none' }} />
                                </section>
                                <section className="content-body my-2">

                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row mt-3 align-items-center">
                                                <div className="col-12">
                                                    <button type="button" class="btn btn-info">
                                                        <a href="/admin/category/index">Trở về danh sách</a>
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
                                                                            <button
                                                                                onClick={() => handTrash(category.id)}
                                                                                className="btn-none text-danger">
                                                                                <FaAngleDoubleUp />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handDelete(category.id)}
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
export default CategoryTrash;