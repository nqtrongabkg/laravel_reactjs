import httpAxios from '../httpAxios';

const OrderService = {
    // Lấy ra danh sách
    index: () => {
        return httpAxios.get('order/index');
    },
    indextrash: () => {
        return httpAxios.get('order/indextrash');
    },
    // Hiển thị chi tiết
    show: (id) => {
        return httpAxios.get(`order/show/${id}`);
    },
    getByUserId: (id) => {
        return httpAxios.get(`order/get/${id}`);
    },
    // Tạo mới
    store: (data) => {
        return httpAxios.post('order/store', data);
    },
    add: (data) => {
        return httpAxios.post('order/addproduct', data);
    },
    createOrder: (user_id) => {
        return httpAxios.post(`order/createorder?user_id=${user_id}`);
    },
    cart: (user_id) => {
        return httpAxios.get(`order/cart?user_id=${user_id}`);
    },
    // Cập nhật
    update: (data, id) => {
        return httpAxios.post(`order/update/${id}`, data);
    },
    status: (id) => {
        return httpAxios.get(`order/status/${id}`);
    },
    trash: (id) => {
        return httpAxios.get(`order/trash/${id}`);
    },
    // Xóa
    destroy: (id) => {
        return httpAxios.delete(`order/destroy/${id}`);
    },
    //xử lý cho xuất hàng:
    getcartexport: (user_id) => {
        return httpAxios.get(`order/getcartexport`);
    },
    createOrderExport: (data) => {
        return httpAxios.post(`order/createorderexport`, data);
    },
    changestatusorderexport: () => {
        return httpAxios.get(`order/changestatusorderexport`);
    },
    addproducttocartexport: (data) => {
        return httpAxios.post('order/addproducttocartexport', data);
    },
};

export default OrderService;
