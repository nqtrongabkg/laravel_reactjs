import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostService from '../../services/PostService';
import { urlImage } from '../../config';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.show(id);
        const responses = await PostService.indexnew();
        const modifiedPost = {
          ...response.post,
          detail: response.post.detail.replace(/\n/g, '<br />'),
        };
        setPost(modifiedPost);
        setPosts(responses.posts);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>; // Add a loading indicator
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-9">
          <img
            src={`${urlImage}post/${post.image}`}
            className="img-fluid rounded mb-3"
            alt={post.slug}
          />
          <h1 className="fw-bold mb-3">{post.title}</h1>
          <p className="text-muted mb-3">
            Published on {new Date(post.created_at).toLocaleDateString()}
          </p>
          <div className="post-detail-content">
            <p className="lead">{post.description}</p>
            <p dangerouslySetInnerHTML={{ __html: post.detail }} />
          </div>
        </div>
        {/* Additional Posts Section */}
        <div className="col-md-3">
          <h2 className="product-header">Bài Viết Mới</h2>
          {posts.map((relatedPost) => (
            <div className="mb-4" key={relatedPost.id}>
              <Link to={`/postdetail/${relatedPost.id}`}>
                <img
                  src={`${urlImage}post/${relatedPost.image}`}
                  className="img-fluid rounded"
                  alt={relatedPost.slug}
                />
                <h5 className="mt-3">{relatedPost.title}</h5>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
