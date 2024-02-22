import { useEffect, useState } from 'react';
import BrandService from '../../../services/BrandService';
import { urlImage } from '../../../config';
import LoadingSpinner from '../../../LoadingSpinner';
import { FaAngleDoubleUp, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';

const BrandTrash = () => {
    const [brands, setBrands] = useState([]);
    const [load, setLoad] = useState(false);
    const [reload, setReload] = useState(0);

    // 
    useEffect(() => {
        (async () => {
            const result = await BrandService.indextrash();
            setBrands(result.brands);
            setLoad(true);
        })();
    }, [reload]);

    
    const handDelete = (id) => {
        (async () => {
            const result = await BrandService.destroy(id);
            if (result.status) {
                toast.success(result.message);
            }
            setReload(result.brand.id)
        })();
    }

    const handTrash = (id) => {
        (async () => {
            // console.log(id);
            const result = await BrandService.trash(id);
            if (result.status) {
                toast.success(result.message);
            }
            setReload(result.brand.id)
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
                                    <h1 className="d-inline">Thùng rác thương hiệu</h1>
                                    <hr style={{ border: 'none' }} />
                                </section>
                                <section className="content-body my-2">

                                    <div className="row">
                                        
                                        <div className="col-md-12">
                                            <div className="row mt-3 align-items-center">
                                                <div className="col-12">
                                                    <button type="button" class="btn btn-info">
                                                        <a href="/admin/brand/index">Trở về danh sách</a>
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
                                                        <th>Tên thương hiệu</th>
                                                        <th>Chi tiết</th>
                                                        <th className="text-center" style={{ width: '30px' }}>ID</th>
                                                    </tr>
                                                </thead>

                                                <tbody>

                                                    {brands && brands.length > 0 &&
                                                        brands.map((brand, index) => {
                                                            return (
                                                                <tr className="datarow" key={index}>
                                                                    <td className="text-center">
                                                                        <input type="checkbox" />
                                                                    </td>
                                                                    <td>
                                                                        <img className="img-fluid"
                                                                            src={urlImage + "brand/" + brand.image}
                                                                            alt={brand.image} />
                                                                    </td>
                                                                    <td>
                                                                        <div className="name">
                                                                            <a href="#nt">
                                                                                {brand.name}
                                                                            </a>
                                                                        </div>
                                                                        <div className="function_style">
                                                                            <button
                                                                                onClick={() => handTrash(brand.id)}
                                                                                className="btn-none text-danger">
                                                                                <FaAngleDoubleUp />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handDelete(brand.id)}
                                                                                className="btn-none text-danger">
                                                                                <FaTrash />
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                    <td>{brand.description}</td>
                                                                    <td className="text-center">{brand.id}</td>
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
export default BrandTrash;