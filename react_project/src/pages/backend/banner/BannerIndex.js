import { useEffect, useState } from 'react';
import BannerService from '../../../services/BannerService';
import { urlImage } from '../../../config';
import LoadingSpinner from '../../../LoadingSpinner';
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";


const BannerIndex = () => {
    const [banners, setBanners] = useState([]);
    const [load, setLoad] = useState(false);
    const [reload, setReload] = useState(0);
    // 
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState(1);
    // 
    useEffect(() => {
        (async () => {
            console.log("call index")
            const result = await BannerService.index();
            setBanners(result.banners);
            setLoad(true);
        })();
    }, [reload]);

    //xử lý thêm banner
    const handleSubmit = (e) => {
        e.preventDefault();
        const image = document.getElementById("image");
        const banner = new FormData();
        banner.append("name", name);
        banner.append("description", description);
        banner.append("link", link);
        banner.append("position", position);
        banner.append("status", status);
        banner.append("image", image.files.length === 0 ? "" : image.files[0]);

        (async () => {
            const result = await BannerService.store(banner);
            toast.success(result.message);
            setReload(result.banner.id);
        })();
    };

    const handleStatus = (id) => {
        console.log(id);
        (async () => {
            try {
                const result = await BannerService.status(id);
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

    const handTrash = (id) => {
        (async () => {
            const result = await BannerService.trash(id);
            if(result.status){
                setReload(Date.now());
                toast.success(result.message);
            }
        })();
    }

    return (
        <>
            <section className="hdl-content">
                {!load && <LoadingSpinner />}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* <!--CONTENT  --> */}
                            <div className="content">
                                <section className="content-header my-2">
                                    <h1 className="d-inline">Banner</h1>
                                    <hr style={{ border: 'none' }} />
                                </section>
                                <section className="content-body my-2">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Tên thương hiệu (*)</strong>
                                                    </label>
                                                    <input type="text"
                                                        name="name" id="name"
                                                        onChange={(e) => { setName(e.target.value) }}
                                                        placeholder="Nhập tên banner"
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
                                                    <label><strong>Link</strong></label>
                                                    <textarea
                                                        onChange={(e) => { setLink(e.target.value) }}
                                                        name="link"
                                                        value={link}
                                                        rows="4"
                                                        className="form-control"
                                                        placeholder="Link">
                                                    </textarea>
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Position</strong></label>
                                                    <textarea
                                                        onChange={(e) => { setPosition(e.target.value) }}
                                                        name="position"
                                                        value={position}
                                                        rows="4"
                                                        className="form-control"
                                                        placeholder="Position">
                                                    </textarea>
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
                                                        <a href="/admin/banner/trash">Thùng rác</a>
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
                                            
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center" style={{ width: '30px' }}>
                                                            <input type="checkbox" id="checkboxAll" />
                                                        </th>
                                                        <th className="text-center" style={{ width: '90px' }}>Hình ảnh</th>
                                                        <th>Tên Banner</th>
                                                        <th>Mô tả</th>
                                                        <th className="text-center" style={{ width: '30px' }}>Link</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    
                                                    {banners && banners.length > 0 &&
                                                        banners.map((banner, index) => {
                                                            return (
                                                                    <tr className="datarow" key={index}>
                                                                        <td className="text-center">
                                                                            <input type="checkbox" />
                                                                        </td>
                                                                        <td>
                                                                            <img className="img-fluid"
                                                                                src={urlImage + "banner/" + banner.image}
                                                                                alt={banner.image} />
                                                                        </td>
                                                                        <td>
                                                                            <div className="name">
                                                                                <a href="#nt">
                                                                                    {banner.name}
                                                                                </a>
                                                                            </div>
                                                                            <div className="function_style">
                                                                                <button>
                                                                                    <a href={`/admin/banner/edit/${banner.id}`} className="px-1 text-success">
                                                                                        <FaEdit />
                                                                                    </a>
                                                                                </button>
                                                                                <button
                                                                                    onClick={() => handleStatus(banner.id)}
                                                                                    className={banner.status === 1 ? "text-success" : "text-danger"}
                                                                                >
                                                                                    {banner.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                                                                </button>
                                                                                <button>
                                                                                    <a href="brand_show.html" className="px-1 text-info">
                                                                                        <FaEye />
                                                                                    </a>
                                                                                </button>
                                                                                <button
                                                                                onClick={() => handTrash(banner.id)}
                                                                                    className="btn-none text-danger">
                                                                                    <FaTrash />
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                        <td>{banner.description}</td>
                                                                        <td className="text-center">{banner.link}</td>
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
export default BannerIndex;