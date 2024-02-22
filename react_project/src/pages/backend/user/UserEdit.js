import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserService from '../../../services/UserService';
import { toast } from 'react-toastify'

const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [roles, setRoles] = useState(3);
    const [status, setStatus] = useState(1);

    useEffect(() => {
        (async () => {
            const result = await UserService.show(id);
            setName(result.user.name);
            setUsername(result.user.username);
            setPassword(result.user.password);
            setGender(result.user.gender);
            setPhone(result.user.phone);
            setEmail(result.user.email);
            setRoles(result.user.roles);
            setStatus(result.user.status);
        })();
    }, [id]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const user = new FormData();
        user.append("name", name);
        user.append("username", username);
        user.append("password", password);
        user.append("gender", gender);
        user.append("phone", phone);
        user.append("email", email);
        user.append("roles", roles);
        user.append("status", status);
        (async () => {
            const result = await UserService.update(user, id);
            toast.success(result.message);
            navigate("/admin/user/index", { replace: true });
        })();
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div class="content">
                <section class="content-header my-2">
                    <h1 class="d-inline">Cập nhật người dùng</h1>
                    <div class="row mt-2 align-items-center">
                        <div class="col-md-12 text-end">
                            <button class="btn btn-success btn-sm" name="CAPNHAT">
                                <i class="fa fa-save"></i> Lưu [Cập nhật]
                            </button>
                            <Link to="/admin/user/index" class="btn btn-primary btn-sm">
                                <i class="fa fa-arrow-left"></i> Về danh sách
                            </Link>
                        </div>
                    </div>
                </section>
                <section class="content-body my-2">

                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label><strong>Tên đăng nhập(*)</strong></label>
                                <input type="text" name="username" className="form-control" placeholder="Tên đăng nhập" value={username} onChange={e => setUsername(e.target.value)} />
                            </div>
                            <div class="mb-3">
                                <label><strong>Mật khẩu(*)</strong></label>
                                <input type="password" name="password" className="form-control" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div class="mb-3">
                                <label><strong>Email(*)</strong></label>
                                <input type="text" name="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div class="mb-3">
                                <label><strong>Điện thoại(*)</strong></label>
                                <input type="text" name="phone" className="form-control" placeholder="Điện thoại" value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label><strong>Họ tên (*)</strong></label>
                                <input type="text" name="name" class="form-control" placeholder="Họ tên" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div class="mb-3">
                                <label><strong>Giới tính</strong></label>
                                <select name="gender" id="gender" class="form-select" onChange={(e) => { setGender(e.target.value) }}
                                    value={gender}>
                                    <option>Chọn giới tinh</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nu">Nữ</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label><strong>Trạng thái</strong></label>
                                <select name="status" class="form-select" onChange={(e) => { setStatus(e.target.value) }}
                                    value={status}>
                                    <option value="1">hoạt động</option>
                                    <option value="2">Không hoạt động</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </form>
    );
};
export default UserEdit;