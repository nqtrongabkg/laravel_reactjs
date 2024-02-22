import { useEffect, useState } from 'react';
import BannerService from '../../../services/BannerService';
import { urlImage } from '../../../config';
import LoadingSpinner from '../../../LoadingSpinner';
import { FaAngleDoubleUp, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";


const BannerTrash = () => {
    const [banners, setBanners] = useState([]);
    const [load, setLoad] = useState(false);
    const [reload, setReload] = useState(0);

    // 
    useEffect(() => {
        (async () => {
            const result = await BannerService.indextrash();
            setBanners(result.banners);
            setLoad(true);
        })();
    }, [reload]);

    

    const handTrash = (id) => {
        (async () => {
            try {
                const result = await BannerService.trash(id);
                if (result) {
                    setReload(Date.now());
                    toast.success(result.message);
                }
            } catch (error) {
                console.error("Error changing status:", error);
                toast.error("Error changing status");
            }
        })();
    };

    const handDelete = (id) => {
        (async () => {
            const result = await BannerService.destroy(id);
            setReload(result.banner.id)
            toast.success(result.message);
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
                                    <h1 className="d-inline">Thùng rác banner</h1>
                                    <hr style={{ border: 'none' }} />
                                </section>
                                <section className="content-body my-2">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row mt-3 align-items-center">
                                                <div className="col-12">
                                                    <button type="button" className="btn btn-warning">
                                                        <a href="/admin/banner/index">Về danh sách</a>
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
                                                                            <button
                                                                                onClick={() => handTrash(banner.id)}
                                                                                className="btn-none text-danger">
                                                                                <FaAngleDoubleUp />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handDelete(banner.id)}
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
export default BannerTrash;