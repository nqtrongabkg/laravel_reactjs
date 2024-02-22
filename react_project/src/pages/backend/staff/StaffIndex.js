/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import UserService from '../../../services/UserService';
import { FaToggleOn, FaTrash, FaEdit, FaToggleOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const StaffIndex = () => {
    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        (async () => {
            const result = await UserService.indexstaff();
            setUsers(result.user);
        })();
    }, [reload]);

    const handleStatus = (id) => {
        (async () => {
            const result = await UserService.status(id);
            if (result.status) {
                setReload(Date.now());
                toast.success(result.message);
            }
        })();
    };

    const HandTrash = (id) => {
        (async () => {
            const result = await UserService.trash(id);
            if (result) {
                setReload(Date.now());
                toast.success(result.message);
            }
        })();
    };

    return (
        <div class="content">
            <section class="content-header my-2">
                <h1 class="d-inline">Thành Viên</h1>
                <Link to="/admin/user/add" class="btn-add">Thêm mới</Link>
                <div class="row mt-3 align-items-center">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <a href="/admin/user/trash">Thùng rác</a>
                        </button>
                    </div>
                </div>
            </section>
            <section class="content-body my-2">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="text-center" style={{ width: '30px' }}>
                                <input type="checkbox" id="checkAll" />
                            </th>
                            <th>Tài khoản</th>
                            <th>Họ tên</th>
                            <th>Điện thoại</th>
                            <th>Email</th>
                            <th class="text-center" style={{ width: '30px' }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.length > 0 &&
                            users.map((user, index) => {
                                return (
                                    <>
                                        {/* {users && users.map(())} */}
                                        <tr class="datarow">
                                            <td class="text-center">
                                                <input type="checkbox" id="checkId" />
                                            </td>
                                            <td>{user.roles === '3' ? "Khách hàng" : "Nhân viên"}</td>
                                            <td>
                                                <div class="name">
                                                    <a href="menu_index.html">
                                                        {user.name}
                                                    </a>
                                                </div>
                                                <div class="function_style">
                                                    <button
                                                        onClick={() => handleStatus(user.id)}
                                                        className={
                                                            user.status === 1 ? "border-0 px-1 text-success" : "border-0 px-1 text-danger"
                                                        }>
                                                        {user.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                                    </button>
                                                    <Link to={"/admin/staff/edit/" + user.id} className='px-1 text-primary'>
                                                        <FaEdit />
                                                    </Link>
                                                    <button
                                                        onClick={() => HandTrash(user.id)}
                                                        className="btn-none px-1 text-danger">
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                            <td>{user.phone}</td>
                                            <td>{user.email}</td>
                                            <td class="text-center">{user.id}</td>
                                        </tr>
                                    </>
                                );
                            })
                        }
                    </tbody>
                </table>

            </section>
        </div>
    );
};
export default StaffIndex;