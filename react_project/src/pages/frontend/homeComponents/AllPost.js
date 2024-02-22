import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { urlImage } from '../../../config';
import PostService from './../../../services/PostService';

const AllPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await PostService.indextech();
        setPosts(response.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="allpost-container mt-5">
      <h2 className="product-header">Thông tin công nghệ</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {posts.map((post) => (
          <Link to={`/postdetail/${post.id}`} key={post.id}>
            <div className="allpost-col" key={post.id}>
              <div className="allpost-card mb-3">
                <img
                  src={`${urlImage}post/${post.image}`}
                  className="allpost-card-img-top img-fluid"
                  alt={post.slug}
                />
                <div className="allpost-card-body">
                  <h5 className="allpost-card-title">{post.title}</h5>
                  <p className="allpost-card-text">{post.description}</p>
                </div>  
              </div>
            </div>
                </Link>
          
        ))}
      </div>
    </div>
  );
};

export default AllPost;
