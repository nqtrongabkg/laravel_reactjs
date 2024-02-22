/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import BannerService from '../../../services/BannerService';
import CategoryService from '../../../services/CategoryService';
import { urlImage } from '../../../config';
import BrandService from '../../../services/BrandService';
import { Link } from 'react-router-dom';

const Slider = () => {
    const [banners, setBanners] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [reload, setReload] = useState(0);
    useEffect(() => {
        (async () => {
            const bannerResponse = await BannerService.index();
            const categoryResponse = await CategoryService.index();
            const brandResponse = await BrandService.index();
            setBanners(bannerResponse.banners);
            setCategories(categoryResponse.categories);
            setBrands(brandResponse.brands)
        })();
    }, [reload]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    {/* Category */}
                    <ul className="list-group category-section">
                        {categories.length > 0 && categories.map((category) => (
                            <li key={category.id} className="list-group-item">
                                <Link to={`/allproductbycategory/${category.id}`} className="stretched-link">{category.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {banners.length > 0 && (
                        <Carousel>
                            {banners.map((banner) => (
                                <Carousel.Item key={banner.id}>
                                    <img
                                        className="d-block w-100"
                                        src={`${urlImage}banner/${banner.image}`}
                                        alt={banner.image}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    )}
                </div>
                <div className="col-md-3">
                    {/* Placeholder for additional content */}
                    <ul className="list-group category-section">
                        {brands.length > 0 && brands.map((brand) => (
                            <li key={brand.id} className="list-group-item">
                                <Link to={`/allproductbybrand/${brand.id}`} className="stretched-link">Thương hiệu {brand.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default Slider;