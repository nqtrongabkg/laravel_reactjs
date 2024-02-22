import httpAxios from '../httpAxios';

const ProductService = {
    // Lấy ra danh sách
    index: () => {
        return httpAxios.get('product/index');
    },
    sale: () => {
        return httpAxios.get('product/sale');
    },
    import: () => {
        return httpAxios.get('product/import');
    },
    // Hiển thị chi tiết
    show: (id) => {
        return httpAxios.get(`product/show/${id}`);
    },
    productnew: (limit) => {
        return httpAxios.get(`product/productnew/${limit}`);
    },
    productHotBuy: (limit) => {
        return httpAxios.get(`product/producthotbuy/${limit}`);
    },
    getByCategory: (category_id) => {
        return httpAxios.get(`product/productcategory/${category_id}`);
    },
    getByBrand: (brand_id) => {
        return httpAxios.get(`product/productbrand/${brand_id}`);
    },
    showSale: (id) => {
        return httpAxios.get(`product/showsale/${id}`);
    },
    // Tạo mới
    store: (data) => {
        return httpAxios.post('product/store', data);
    },
    storeSale: (data) => {
        return httpAxios.post('product/storesale', data);
    },
    storeImport: (data) => {
        return httpAxios.post('product/storeimport', data);
    },
    // Cập nhật
    update: (data, id) => {
        return httpAxios.post(`product/update/${id}`, data);
    },
    updateSale: (data, id) => {
        return httpAxios.post(`product/updatesale/${id}`, data);
    },
    status: (id) => {
        return httpAxios.get(`product/status/${id}`);
    },
    // Xóa
    destroy: (id) => {
        return httpAxios.delete(`product/destroy/${id}`);
    },
    destroySale: (id) => {
        return httpAxios.delete(`product/destroysale/${id}`);
    },
    indexpagination: (page, perPage) => {
        return httpAxios.get('product/indexpagination', {
            params: {
                page: page,
                perPage: perPage
            }
        });
    },
    searchLikeName: (query) => {
        return httpAxios.get(`product/searchlike`, {
            params: query
        });
    },
    trash: (id) => {
        return httpAxios.get(`product/trash/${id}`);
    },
    indextrash: () => {
        return httpAxios.get('product/indextrash');
    },
    filterProducts: (params) => {
        return httpAxios.get('product/filterproducts', {
            params: params
        });
    },
};

export default ProductService;
