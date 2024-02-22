import httpAxios from '../httpAxios';

const MenuService = {

    // Lấy ra danh sách
    index: () => {
        return httpAxios.get('menu/index');
    },
    indextrash: () => {
        return httpAxios.get('menu/indextrash');
    },
    // Hiển thị chi tiết
    show: (id) => {
        return httpAxios.get(`menu/show/${id}`);
    },
    // Tạo mới
    store: (data) => {
        return httpAxios.post('menu/store', data);
    },
    // Cập nhật
    update: (data, id) => {
        return httpAxios.post(`menu/update/${id}`, data);
    },
    status: (id) => {
        return httpAxios.get(`menu/status/${id}`);
    },
    trash: (id) => {
        return httpAxios.get(`menu/trash/${id}`);
    },
    // Xóa
    destroy: (id) => {
        return httpAxios.delete(`menu/destroy/${id}`);
    },

};

export default MenuService;
