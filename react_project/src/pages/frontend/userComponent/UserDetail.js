import React from 'react';
import { useUserContext } from '../../../layouts/LayoutSite';

const UserDetail = ({ user }) => {
    // Format roles for display
    const formatRole = (role) => {
        switch (role) {
            case "1": return "Quản trị";
            case "2": return "Thành viên";
            case "3": return "Khách hàng";
            default: return "Khách hàng";
        }
    };

    const { logout } = useUserContext();

    return (
        <div className="user-detail-container">
            <h2 className="detailusser-title">Thông tin tài khoản</h2>
            <div className="user-detail">
                <div className="user-detail-row">
                    <span className="user-detail-label">Tên:</span>
                    <span className="user-detail-value">{user.name}</span>
                </div>
                <div className="user-detail-row">
                    <span className="user-detail-label">Giới tính:</span>
                    <span className="user-detail-value">{user.gender}</span>
                </div>
                <div className="user-detail-row">
                    <span className="user-detail-label">Số điện thoại:</span>
                    <span className="user-detail-value">{user.phone}</span>
                </div>
                <div className="user-detail-row">
                    <span className="user-detail-label">Địa chỉ email:</span>
                    <span className="user-detail-value">{user.email}</span>
                </div>
                <div className="user-detail-row">
                    <span className="user-detail-label">Loại tài khoản</span>
                    <span className="user-detail-value">{formatRole(user.roles)}</span>
                </div>
            </div>
            {/* <button onClick={logout} className="btn btn-secondary mt-3">
                Logout
            </button> */}
            <div class="row mt-3 align-items-center">
                <div className="col-6">
                    <button type="button" className="btn btn-warning" onClick={logout}>
                       Đăng xuất
                    </button>
                </div>
                <div className="col-6">
                    <button type="button" className="btn btn-warning">
                        <a href={`/userupdate/${user.id}`}>Chỉnh sửa</a>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
