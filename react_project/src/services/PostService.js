import httpAxios from '../httpAxios';

const PostService = {
    // Lấy ra danh sách
    index: () => {
        return httpAxios.get('post/index');
    },
    indexpage: () => {
        return httpAxios.get('post/indexpage');
    },
    indextrash: () => {
        return httpAxios.get('post/indextrash');
    },
    indextrashpage: () => {
        return httpAxios.get('post/indextrashpage');
    },
    indexnew: () => {
        return httpAxios.get('post/indexnew');
    },
    indextech: () => {
        return httpAxios.get('post/indextech');
    },
    // Hiển thị chi tiết
    show: (id) => {
        return httpAxios.get(`post/show/${id}`);
    },
    showbyslug: (slug) => {
        return httpAxios.get(`post/showbyslug/${slug}`);
    },
    // Tạo mới
    store: (data) => {
        return httpAxios.post('post/store', data);
    },
    // Cập nhật
    update: (data, id) => {
        return httpAxios.post(`post/update/${id}`, data);
    },
    updatepage: (data, id) => {
        return httpAxios.post(`post/updatepage/${id}`, data);
    },
    status: (id) => {
        return httpAxios.get(`post/status/${id}`);
    },
    trash: (id) => {
        return httpAxios.get(`post/trash/${id}`);
    },
    // Xóa
    destroy: (id) => {
        return httpAxios.delete(`post/destroy/${id}`);
    },
};

export default PostService;
