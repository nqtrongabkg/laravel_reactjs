import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductService from '../../services/ProductService';
import ProductShow from './productDetailComponents/ProductShow';
import ProductSimilar from './productDetailComponents/ProductSimilar';

export const useScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
};

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    useScrollToTop();
    useEffect(() => {
        ProductService.show(id).then(response => {
             setProduct(response.product);
         }).catch(error => {
            console.error("Failed to load product details", error);
        });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>; 
    }
    return (
        <>
            <ProductShow product={product} />
            <ProductSimilar category_id={product.category_id} />
        </>
    );
};

export default ProductDetail;
