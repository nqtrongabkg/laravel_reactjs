import httpAxios from '../httpAxios';

const TopicService = {
    // Lấy ra danh sách
    index: () => {
        return httpAxios.get('topic/index');
    },
    indextrash: () => {
        return httpAxios.get('topic/indextrash');
    },
    // Hiển thị chi tiết
    show: (id) => {
        return httpAxios.get(`topic/show/${id}`);
    },
    // Tạo mới
    store: (data) => {
        return httpAxios.post('topic/store', data);
    },
    // Cập nhật
    update: (data, id) => {
        return httpAxios.post(`topic/update/${id}`, data);
    },
   
    status: (id) => {
        return httpAxios.get(`topic/status/${id}`);
    },
    trash: (id) => {
        return httpAxios.get(`topic/trash/${id}`);
    },
    // Xóa
    destroy: (id) => {
        return httpAxios.delete(`topic/destroy/${id}`);
    },
};

export default TopicService;
