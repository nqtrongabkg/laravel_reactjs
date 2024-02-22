import { useEffect, useState } from 'react';
import TopicService from '../../../services/TopicService';
import LoadingSpinner from '../../../LoadingSpinner';
import { FaAngleDoubleUp, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';

const TopicTrash = () => {
    const [topics, setTopics] = useState([]);
    const [load, setLoad] = useState(false);
    const [reload, setReload] = useState(0);

    //
    useEffect(() => {
        (async () => {
            const result = await TopicService.indextrash();
            setTopics(result.topics);
            setLoad(true);
        })();
    }, [reload]);

    
    const handTrash = (id) => {
        (async () => {
            try {
                const result = await TopicService.trash(id);
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
            const result = await TopicService.destroy(id);
            if (result) {
                toast.success(result.message);
            }
            setReload(result.topic.id)
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
                                    <h1 className="d-inline">Thùng rác chủ đề</h1>
                                    <hr style={{ border: 'none' }} />
                                </section>
                                <section className="content-body my-2">

                                    <div className="row">
                                        
                                        <div className="col-md-12">
                                            <div className="row mt-3 align-items-center">
                                                <div className="col-12">
                                                    <button type="button" className="btn btn-warning">
                                                        <a href="/admin/topic/index">Về danh sách</a>
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
                                                        <th>Tên chủ đề</th>
                                                        <th>Chi tiết</th>
                                                        <th className="text-center" style={{ width: '30px' }}>ID</th>
                                                    </tr>
                                                </thead>

                                                <tbody>

                                                    {topics && topics.length > 0 &&
                                                        topics.map((topic, index) => {
                                                            return (
                                                                <tr className="datarow" key={index}>
                                                                    <td className="text-center">
                                                                        <input type="checkbox" />
                                                                    </td>
                                                                    {/* <td>
                                                                        <img className="img-fluid"
                                                                            src={urlImage + "topic/" + topic.image}
                                                                            alt={topic.image} />
                                                                    </td> */}
                                                                    <td>
                                                                        <div className="name">
                                                                            <a href="#nt">
                                                                                {topic.name}
                                                                            </a>
                                                                        </div>
                                                                        <div className="function_style">
                                                                            <button
                                                                                onClick={() => handTrash(topic.id)}
                                                                                className="btn-none text-danger">
                                                                                <FaAngleDoubleUp />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleDelete(topic.id)}
                                                                                className="btn-none text-danger">
                                                                                <FaTrash />
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                    <td>{topic.description}</td>
                                                                    <td className="text-center">{topic.id}</td>
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
export default TopicTrash;