/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import { FaAngleDoubleUp, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const UserTrash = () => {
    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        (async () => {
            const result = await UserService.indextrash(2);
            setUsers(result.user);
            console.log(users)
        })();
    }, [reload]);

    const handleTrash = (id) => {
        (async () => {
            const result = await UserService.trash(id);
            if(result.message){
                setReload(Date.now());
                toast.success(result.message);
            }
        })();
    };

    const HandDelete = (id) => {
        (async () => {
            const result = await UserService.destroy(id);
            if (result) {
                setReload(Date.now()); 
                toast.success(result.message);
            }
        })();
    };

    return (
        <div class="content">
            <section class="content-header my-2">
                <h1 class="d-inline">Thùng rác khách hàng</h1>
                <div class="row mt-3 align-items-center">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <a href="/admin/user/index">Về danh sách</a>
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
                                            <td>
                                                <div class="name">
                                                    <a href="menu_index.html">
                                                        {user.name}
                                                    </a>
                                                </div>
                                                <div class="function_style">
                                                    <button
                                                        onClick={() => handleTrash(user.id)}
                                                        className="btn-none text-danger">
                                                        <FaAngleDoubleUp />
                                                    </button>
                                                    <button
                                                        onClick={() => HandDelete(user.id)}
                                                        className="btn-none text-danger">
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
}

export default UserTrash;