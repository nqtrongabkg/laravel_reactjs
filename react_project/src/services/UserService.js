import httpAxios from '../httpAxios';

const UserService = {
    // Lấy ra danh sách
    index: () => {
        return httpAxios.get('user/index');
    },
    indexstaff: () => {
        return httpAxios.get('user/indexstaff');
    },
    indextrash: () => {
        return httpAxios.get('user/indextrash');
    },
    indextrashstaff: () => {
        return httpAxios.get('user/indextrashstaff');
    },
    // Hiển thị chi tiết
    show: (id) => {
        return httpAxios.get(`user/show/${id}`);
    },
    login: (user) => {
        return httpAxios.post(`user/login`, user);
    },
    loginAdmin: (user) => {
        return httpAxios.post(`user/loginadmin`, user);
    },
    // Tạo mới
    store: (data) => {
        return httpAxios.post('user/store', data);
    },
    // Cập nhật
    update: (data, id) => {
        return httpAxios.post(`user/update/${id}`, data);
    },
    status: (id) => {
        return httpAxios.get(`user/status/${id}`);
    },
    trash: (id) => {
        return httpAxios.get(`user/trash/${id}`);
    },
    // Xóa
    destroy: (id) => {
        return httpAxios.delete(`user/destroy/${id}`);
    },
};

export default UserService;
