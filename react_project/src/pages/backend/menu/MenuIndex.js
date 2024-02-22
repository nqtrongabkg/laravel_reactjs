import { useEffect, useState } from 'react';
import MenuService from '../../../services/MenuService';
// import { urlImage } from '../../../config';
import LoadingSpinner from '../../../LoadingSpinner';
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';

const MenuIndex = () => {
    const [menus, setMenus] = useState([]);
    const [load, setLoad] = useState(false);
    const [reload, setReload] = useState(0);
    // 
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [sort_order, setSortOrder] = useState(1);
    const [status, setStatus] = useState(1);
    //
    useEffect(() => {
        (async () => {
            const result = await MenuService.index();
            setMenus(result.menus);
            setLoad(true);
        })();
    }, [reload]);

    //xử lý thêm menu
    const handleSubmit = (e) => {
        e.preventDefault();
        const menu = new FormData();
        menu.append("name", name);
        menu.append("link", link);
        menu.append("type", type);
        menu.append("description", description);
        menu.append("sort_order", sort_order);
        menu.append("status", status);

        (async () => {
            const result = await MenuService.store(menu);
            if(result.status){
                toast.success(result.message);
                setReload(Date.now());
            }
        })();
    };

    const handleStatus = (id) => {
        console.log(id);
        (async () => {
            try {
                const result = await MenuService.status(id);
                if (result) {
                    toast.success(result.message);
                    setReload(Date.now());
                }
            } catch (error) {
                console.error("Error changing status:", error);
                toast.error("Error changing status");
            }
        })();
    };

    const handTrash = (id) => {
        (async () => {
            const result = await MenuService.trash(id);
            if (result) {
                toast.success(result.message);
            }
            setReload(Date.now())
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
                                    <h1 className="d-inline">Menu</h1>
                                    <hr style={{ border: 'none' }} />
                                </section>
                                <section className="content-body my-2">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Tên menu (*)</strong>
                                                    </label>
                                                    <input type="text"
                                                        name="name" id="name"
                                                        onChange={(e) => { setName(e.target.value) }}
                                                        placeholder="Nhập tên menu"
                                                        className="form-control"
                                                        required />
                                                </div>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Đường dẫn</strong>
                                                    </label>
                                                    <input type="text"
                                                        name="link" id="link"
                                                        onChange={(e) => { setLink(e.target.value) }}
                                                        placeholder="Nhập đường dẫn"
                                                        className="form-control"
                                                        required />
                                                </div>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Loại menu</strong>
                                                    </label>
                                                    <input type="text"
                                                        name="type" id="type"
                                                        onChange={(e) => { setType(e.target.value) }}
                                                        placeholder="Nhập loại"
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
                                                        <a href="/admin/menu/trash">Thùng rác</a>
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
                                                                            <button>
                                                                                <a href={`/admin/menu/edit/${menu.id}`} className="px-1 text-success">
                                                                                    <FaEdit />
                                                                                </a>
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleStatus(menu.id)}
                                                                                className={menu.status === 1 ? "text-success" : "text-danger"}
                                                                            >
                                                                                {menu.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                                                            </button>
                                                                            <button>
                                                                                <a href="menu_show.html" className="px-1 text-info">
                                                                                    <FaEye />
                                                                                </a>
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handTrash(menu.id)}
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
export default MenuIndex;