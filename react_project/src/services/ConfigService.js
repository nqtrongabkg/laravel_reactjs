import httpAxios from '../httpAxios';

const ConfigService = {

    // Lấy ra danh sách
    // index: () => {
    //     return httpAxios.get('config/index');
    // },
    // Hiển thị chi tiết
    show: (id) => {
        return httpAxios.get(`config/show/${id}`);
    },
    // // Tạo mới
    // store: (data) => {
    //     return httpAxios.post('config/store', data);
    // },
    // Cập nhật
    update: (data, id) => {
        return httpAxios.post(`config/update/${id}`, data);
    },
    // status: (id) => {
    //     return httpAxios.get(`config/status/${id}`);
    // },
    // // Xóa
    // destroy: (id) => {
    //     return httpAxios.delete(`config/destroy/${id}`);
    // },

};

export default ConfigService;
