import httpAxios from '../httpAxios';

const ContactService = {

    // Lấy ra danh sách
    index: () => {
        return httpAxios.get('contact/index');
    },
    indextrash: () => {
        return httpAxios.get('contact/indextrash');
    },
    // Hiển thị chi tiết
    show: (id) => {
        return httpAxios.get(`contact/show/${id}`);
    },
    // Tạo mới
    store: (data) => {
        return httpAxios.post('contact/store', data);
    },
    replay: (data) => {
        return httpAxios.post('contact/replay', data);
    },
    // Cập nhật
    update: (data, id) => {
        return httpAxios.post(`contact/update/${id}`, data);
    },
    status: (id) => {
        return httpAxios.get(`contact/status/${id}`);
    },
    trash: (id) => {
        return httpAxios.get(`contact/trash/${id}`);
    },
    // Xóa
    destroy: (id) => {
        return httpAxios.delete(`contact/destroy/${id}`);
    },
};

export default ContactService;
