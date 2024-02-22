import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContactService from '../../../services/ContactService';
import { toast } from 'react-toastify';

function ContactReply() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const repContact = {
            name,
            email,
            phone,
            title,
            content,
            replay_id: id,
            status: 1,
        };

        try {
            const result = await ContactService.replay(repContact);
            toast.success(result.message);
            navigate('/admin/contact/index', { replace: true });
        } catch (error) {
            console.error('Error updating contact:', error);
            toast.error('An error occurred while updating the contact.');
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Trả lời liên hệ</h1>
                    <div className="text-end">
                        <a href="/admin/contact/index" className="btn btn-sm btn-success">
                            <i className="fa fa-arrow-left" /> Về danh sách
                        </a>
                        <button type="submit" className="btn btn-success btn-sm text-end">
                            <i className="fa fa-save" aria-hidden="true" /> Trả lời liên hệ
                        </button>
                    </div>
                </section>
                <section className="content-body my-2">
                    <div className="row">
                        <div className="col-4">
                            <div className="mb-3">
                                <label htmlFor="name" className="text-main">
                                    Họ tên
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control"
                                    placeholder="Nhập họ tên"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="mb-3">
                                <label htmlFor="phone" className="text-main">
                                    Điện thoại
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="form-control"
                                    placeholder="Nhập điện thoại"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="mb-3">
                                <label htmlFor="email" className="text-main">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"
                                    placeholder="Nhập email"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="mb-3">
                                <label htmlFor="title" className="text-main">
                                    Tiêu đề
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="form-control"
                                    placeholder="Nhập tiêu đề"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="content" className="text-main">
                                    Nội dung
                                </label>
                                <textarea
                                    onChange={(e) => setContent(e.target.value)}
                                    className="form-control"
                                    placeholder="Nhập nội dung liên hệ"
                                    value={content}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </form>
    );
}

export default ContactReply;
