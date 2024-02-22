import { useEffect, useState } from "react";
import ContactService from "../../../services/ContactService";
import { FaToggleOn, FaTrash, FaEye, FaEdit, FaToggleOff } from 'react-icons/fa';
import { toast } from 'react-toastify';

function ContactIndex() {
    const [contacts, setContacts] = useState([]);
    const [reload, setReload] = useState(0);


    useEffect(() => {
        (async () => {
            const result = await ContactService.index();
            setContacts(result.conntacts);
        })();
    }, [reload]);

    const handDelete = (id) => {
        (async () => {
            const result = await ContactService.trash(id);
            if(result){
                setReload(Date.now());
                toast.success(result.message);
            }
        })();
    };

    const handleStatus = (id) => {
        (async () => {
            const result = await ContactService.status(id);
            if(result){
                setReload(Date.now());
                toast.success(result.message);
            }
        })();
    };

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Liên hệ</h1>
            </section>
            <div className="row mt-3 align-items-center">
                <div className="col-12">
                    <button type="button" className="btn btn-warning">
                        <a href="/admin/contact/trash">Thùng rác</a>
                    </button>
                </div>
            </div>
            <section className="content-body my-2">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: 30 }}>
                                <input type="checkbox" id="checkboxAll" />
                            </th>
                            <th>Replay ID</th>
                            <th>Họ tên</th>
                            <th>Điện thoại</th>
                            <th>Email</th>
                            <th>Tiêu đề</th>
                            <th className="text-center" style={{ width: 30 }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts &&
                            contacts.length > 0 &&
                            contacts.map((contact) => (
                                <tr className="datarow" key={contact.id}>
                                    <td className="text-center">
                                        <input type="checkbox" />
                                    </td>
                                    <td>{contact.replay_id}</td>
                                    <td>
                                        <div className="name">
                                            <a href="contact_reply.html">{contact.name}</a>
                                        </div>
                                        <div className="function_style">
                                            <a href={`/admin/contact/reply/${contact.id}`} className="px-1 text-success">
                                                <FaEdit /> trả lời
                                            </a>
                                            <button
                                                onClick={() => handleStatus(contact.id)}
                                                className={
                                                    contact.status === 1
                                                        ? "border-0 px-1 text-success"
                                                        : "border-0 px-1 text-danger"
                                                }>
                                                {contact.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                            </button>
                                            <a href="brand_show.html" className="px-1 text-info">
                                                <FaEye />
                                            </a>
                                            <button
                                                onClick={() => handDelete(contact.id)}
                                                className="btn-none px-1 text-danger">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                    <td>{contact.phone}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.title}</td>
                                    <td className="text-center">{contact.id}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </section>
        </div>

    )
}

export default ContactIndex
