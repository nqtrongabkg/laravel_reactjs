import { useEffect, useState } from 'react';
import MenuService from '../../../services/MenuService';
import LoadingSpinner from '../../../LoadingSpinner';
import { FaAngleDoubleUp, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';

const MenuTrash = () => {
    const [menus, setmenus] = useState([]);
    const [load, setLoad] = useState(false);
    const [reload, setReload] = useState(0);

    //
    useEffect(() => {
        (async () => {
            const result = await MenuService.indextrash();
            setmenus(result.menus);
            setLoad(true);
        })();
    }, [reload]);

    
    const handTrash = (id) => {
        (async () => {
            try {
                const result = await MenuService.trash(id);
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

    const handleDelete = (id) => {
        (async () => {
            const result = await MenuService.destroy(id);
            if (result) {
                toast.success(result.message);
            }
            setReload(result.menu.id)
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
                                    <h1 className="d-inline">Thùng rác menu</h1>
                                    <hr style={{ border: 'none' }} />
                                </section>
                                <section className="content-body my-2">

                                    <div className="row">
                                        
                                        <div className="col-md-12">
                                            <div className="row mt-3 align-items-center">
                                                <div className="col-12">
                                                    <button type="button" className="btn btn-warning">
                                                        <a href="/admin/menu/index">Về danh sách</a>
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
                                                        {/* <th className="text-center" style={{ width: '90px' }}>Hình ảnh</th> */}
                                                        <th>Tên menu</th>
                                                        <th>Đường dẫn</th>
                                                        <th>Loại</th>
                                                        <th>Chi tiết</th>
                                                        <th className="text-center" style={{ width: '30px' }}>ID</th>
                                                    </tr>
                                                </thead>

                                                <tbody>

                                                    {menus && menus.length > 0 &&
                                                        menus.map((menu, index) => {
                                                            return (
                                                                <tr className="datarow" key={index}>
                                                                    <td className="text-center">
                                                                        <input type="checkbox" />
                                                                    </td>
                                                                    <td>
                                                                        <div className="name">
                                                                            <a href="#nt">
                                                                                {menu.name}
                                                                            </a>
                                                                        </div>
                                                                        <div className="function_style">
                                                                            <button
                                                                                onClick={() => handTrash(menu.id)}
                                                                                className="btn-none text-danger">
                                                                                <FaAngleDoubleUp />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleDelete(menu.id)}
                                                                                className="btn-none text-danger">
                                                                                <FaTrash />
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                    <td>{menu.link}</td>
                                                                    <td>{menu.type}</td>
                                                                    <td>{menu.description}</td>
                                                                    <td className="text-center">{menu.id}</td>
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
export default MenuTrash;