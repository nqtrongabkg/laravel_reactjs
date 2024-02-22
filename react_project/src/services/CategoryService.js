import httpAxios from '../httpAxios';

const CategoryService = {
    // Lấy ra danh sách
    index: () => {
        return httpAxios.get('category/index');
    },
    indextrash: () => {
        return httpAxios.get('category/indextrash');
    },
    // Hiển thị chi tiết
    show: (id) => {
        return httpAxios.get(`category/show/${id}`);
    },
    // Tạo mới
    store: (data) => {
        return httpAxios.post('category/store', data);
    },
    // Cập nhật
    update: (data, id) => {
        return httpAxios.post(`category/update/${id}`, data);
    },
    status: (id) => {
        return httpAxios.get(`category/status/${id}`);
    },
    trash: (id) => {
        return httpAxios.get(`category/trash/${id}`);
    },
    // Xóa
    destroy: (id) => {
        return httpAxios.delete(`category/destroy/${id}`);
    },
};

export default CategoryService;
