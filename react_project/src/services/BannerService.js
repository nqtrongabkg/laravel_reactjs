import httpAxios from '../httpAxios';

const BannerService = {
    // Lấy ra danh sách
    index: () => {
        return httpAxios.get('banner/index');
    },
    indextrash: () => {
        return httpAxios.get('banner/indextrash');
    },
    // Hiển thị chi tiết
    show: (id) => {
        return httpAxios.get(`banner/show/${id}`);
    },
    // Tạo mới
    store: (data) => {
        return httpAxios.post('banner/store', data);
    },
    // Cập nhật
    update: (data, id) => {
        return httpAxios.post(`banner/update/${id}`, data);
    },
    status: (id) => {
        return httpAxios.get(`banner/status/${id}`);
    },
    trash: (id) => {
        return httpAxios.get(`banner/trash/${id}`);
    },
    // Xóa
    destroy: (id) => {
        return httpAxios.delete(`banner/destroy/${id}`);
    },
};

export default BannerService;
