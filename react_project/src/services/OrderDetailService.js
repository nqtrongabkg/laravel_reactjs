import httpAxios from '../httpAxios';

const OrderDetailService = {
    // Lấy ra danh sách
    index: () => {
        return httpAxios.get('orderdetail/index');
    },
    // Hiển thị chi tiết
    show: (id) => {
        return httpAxios.get(`orderdetail/show/${id}`);
    },
    // Tạo mới
    store: (data) => {
        return httpAxios.post('orderdetail/store', data);
    },
    // Cập nhật
    update: (data, id) => {
        return httpAxios.post(`orderdetail/update/${id}`, data);
    },
    status: (id) => {
        return httpAxios.get(`orderdetail/status/${id}`);
    },
    // Xóa
    destroy: (id) => {
        return httpAxios.delete(`orderdetail/destroy/${id}`);
    },
    getByOrderId: (order_id) => {
        return httpAxios.get(`orderdetail/getbyorder/${order_id}`);
    }
};

export default OrderDetailService;
