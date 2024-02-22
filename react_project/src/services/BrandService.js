import httpAxios from '../httpAxios';

const BrandService = {
  // Lấy ra danh sách
  index: () => {
    return httpAxios.get('brand/index');
  },
  indextrash: () => {
    return httpAxios.get('brand/indextrash');
  },
  // Hiển thị chi tiết
  show: (id) => {
    return httpAxios.get(`brand/show/${id}`);
  },
  // Tạo mới
  store: (data) => {
    return httpAxios.post('brand/store', data);
  },
  // Cập nhật
  update: (data, id) => {
    return httpAxios.post(`brand/update/${id}`, data);
  },
  status: (id) => {
    return httpAxios.get(`brand/status/${id}`);
  },
  // Xóa
  destroy: (id) => {
    return httpAxios.delete(`brand/destroy/${id}`);
  },
  trash: (id) => {
    return httpAxios.get(`brand/trash/${id}`);
  },
};

export default BrandService;
