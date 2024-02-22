import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../../services/PostService';
import { urlImage } from '../../config';

export default function SinglePage() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await PostService.showbyslug(slug);
                if (result.status) {
                    setPost(result.post);
                }
            } catch (err) {
                console.log("Lỗi tải trang đơn bằng slug: ", err);
            }
        };
        loadData();
    }, [slug]);

    return (
        <div className="container mt-5">
            {post && (
                <div>
                    <h1 className="mb-4">{post.title}</h1>
                    <img
                        src={urlImage + "post/" + post.image}
                        alt={post.title}
                        className="img-fluid mb-4"
                    />
                    <div className="mb-4">{post.detail}</div>
                    <p className="font-weight-bold">Mô tả: </p>
                    <p>{post.description}</p>
                    <p className="font-weight-bold">Ngày tạo: {post.created_at}</p>
                    {/* Các thông tin khác có thể hiển thị tại đây */}
                </div>
            )}
        </div>
    );
}
