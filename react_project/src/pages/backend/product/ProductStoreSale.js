import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductService from '../../../services/ProductService';
import { useState } from "react";
import { toast } from 'react-toastify';

const ProductStoreSale = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pricesale, setPriceSale] = useState('');
    const [qty, setQty] = useState('');
    const [begin, setBegin] = useState('');
    const [end, setEnd] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        var productSale = new FormData();
        productSale.append('product_id', id);
        productSale.append('pricesale', pricesale);
        productSale.append('qty', qty);
        productSale.append('date_begin', begin);
        productSale.append('date_end', end);

        (async function () {
            const result = await ProductService.storeSale(productSale);
            if (result.status === true) {
                toast.success(result.message);
                navigate('/admin/product/index', { replace: true });
            }
        })();
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Thêm sản phẩm</h1>
                    <div className="mt-1 text-end">
                        <Link to="/admin/product/index" className="btn btn-sm btn-info mx-1">
                            <FaArrowLeft /> Về danh sách
                        </Link>
                    </div>
                </section>
                <section className="content-body my-2">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="mb-3">
                                <label><strong>Giá giảm (*)</strong></label>
                                <input type="text"
                                    value={pricesale}
                                    onChange={(e) => setPriceSale(e.target.value)}
                                    placeholder="Nhập giá giảm" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label><strong>Số lượng sản phẩm giảm (*)</strong></label>
                                <input type="number" value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                    placeholder="Nhập số lượng" rows="1"
                                    className="form-control" min="1" />
                            </div>
                            <div className="mb-3">
                                <label><strong>Ngày bắt đầu</strong></label>
                                <input type="date"
                                    value={begin}
                                    onChange={(e) => setBegin(e.target.value)}
                                    className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label><strong>Ngày kết thúc</strong></label>
                                <input type="date"
                                    value={end}
                                    onChange={(e) => setEnd(e.target.value)}
                                    className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="box-container mt-4 bg-white">
                                
                                <div className="box-footer text-end px-2 py-2">
                                    <button type="submit" className="btn btn-sm btn-success" name="THEM">
                                        <FaSave /> Lưu[Thêm]
                                    </button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
            </div>
        </form>
    );
}
export default ProductStoreSale;