import React, { useState, useEffect } from 'react';
import '../styles/HomePage.css';
import {
  FaHome, FaSearch, FaCompass, FaPlus,
  FaHeart, FaRegComment, FaUser
} from 'react-icons/fa';
import { BsCameraReels, BsBookmark } from 'react-icons/bs';
import { FiMessageCircle, FiMoreHorizontal, FiSend } from 'react-icons/fi';
import axios from '../api/axios';
import CreatePost from '../components/CreatePost';
import CommentModal from '../components/CommentModal';

const baseURL = process.env.REACT_APP_BASE_URL;  // Replace with your real base URL

const HomePage = () => {
  const [postsData, setPostsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState({});


  const isVideo = (url) => typeof url === 'string' && /\.(mp4|mov|webm)$/i.test(url);

  const fullUrl = (url) => {
    if (!url) return null;
    return url.startsWith("http") ? url : `${baseURL}${url}`;
  };

 const fetchPosts = async () => {
  try {
    const response = await axios.get("/api/posts/", { withCredentials: true });
    const posts = response.data;
    setPostsData(posts);

    // Build a likes object: { postId: true/false }
    const likesMap = {};
    posts.forEach(post => {
      likesMap[post.id] = post.is_liked;
    });
    

    console.log("Fetched posts:", posts);
    console.log("Initialized likes:", likesMap);
  } catch (err) {
    console.error("Failed to fetch posts", err);
  }
  
};useEffect(() => {
  fetchPosts();
}, []);


  const handleToggleLike = async (postId) => {
  try {
    const token = localStorage.getItem('accessToken');

    const response = await axios.post(
      `/api/posts/${postId}/toggle_like/`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );

    setPostsData(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const currentlyLiked = post.is_liked;
          return {
            ...post,
            is_liked: !currentlyLiked,
            likes_count: currentlyLiked
              ? post.likes_count - 1
              : post.likes_count + 1,
          };
        }
        return post;
      })
    );
  } catch (error) {
    console.error('Failed to toggle like:', error);
  }
};



  const handleCommentSubmit = async (postId) => {
  const content = newComment[postId];
  if (!content?.trim()) return;

  try {
    const response = await axios.post(
      `/api/posts/${postId}/add_comment/`,
      { content },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );

    // Optional: Update comments immediately in UI if you're storing them
    setNewComment((prev) => ({ ...prev, [postId]: '' }));
  } catch (err) {
    console.error('Failed to post comment:', err.response?.data || err.message);
  }
};


  return (
    <div className="homepage">
      <CreatePost
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onPostCreated={fetchPosts}
      />

      <div className="sidebar">
        <h2 className="logo">Instagram</h2>
        <nav>
          <ul>
            <li><FaHome /> <span className="nav-label">Home</span></li>
            <li className='desktop-only'><FaSearch /> <span className="nav-label">Search</span></li>
            <li><FaCompass /> <span className="nav-label">Explore</span></li>
            <li><BsCameraReels /> <span className="nav-label">Reels</span></li>
            <li><FaHeart /> <span className="nav-label">Notifications</span></li>
            <li onClick={() => setIsCreateOpen(true)}>
              <FaPlus /> <span className="nav-label">Create</span>
            </li>
            <li className="mobile-only"><FiSend /><span className="nav-label">Messages</span></li>
            <li className="profile-link"><FaUser /><span className="nav-label">Profile</span></li>
          </ul>
        </nav>
      </div>

      <div className="feed">
        <div className="stories">
          {Array.from({ length: 10 }).map((_, idx) => (
            <div className="story" key={idx}>
              <img src={`https://i.pravatar.cc/60?img=${idx + 1}`} alt="story" className="story-img" />
              <p className="story-username">user{idx + 1}</p>
            </div>
          ))}
        </div>

        <div className="message-button">
          <FiMessageCircle size={22} />
        </div>

        <div className="posts">
          {postsData.map((post) => {
            const imageUrl = fullUrl(post.image);
            const videoUrl = fullUrl(post.video);

            return (
              <div className="post" key={post.id}>
                <div className="post-header">
                  <div className="post-user">{post.user}</div>
                  <FiMoreHorizontal className="post-options" />
                </div>

                {isVideo(videoUrl) ? (
                  <video src={videoUrl} controls className="post-media" />
                ) : imageUrl ? (
                  <img src={imageUrl} alt="post" className="post-media" />
                ) : (
                  <p className="error">Media not available</p>
                )}

                <div className="post-actions">
                  <div className='left-icons'>
                    <FaHeart
  className={`like-icon ${post.is_liked ? 'liked' : ''}`}
  onClick={() => handleToggleLike(post.id)}
/>
                    <FaRegComment
                    className="comment-icon"
                    onClick={() => {
                      setSelectedPost(post);
                      setShowModal(true);
                      }}/>
                    <FiSend />
                  </div>
                  <div className='right-icon'><BsBookmark className="save-icon" /></div>
                </div>
                <div className="likes-count">
  {post.likes_count} {post.likes_count === 1 ? "like" : "likes"}
</div>
                <p className="post-caption">
                  <strong>{post.user}</strong> {post.caption}
                </p>

                
  {Array.isArray(post.comments) && post.comments.length > 0 && (
  <p
    className="comment-preview"
    onClick={() => {
      setSelectedPost({
        ...post,
        mediaType: post.video ? 'video' : 'image',
        mediaUrl: post.video ? fullUrl(post.video) : fullUrl(post.image),
      });
      setShowModal(true);
    }}
  >
    View all {post.comments.length}{" "}
    {post.comments.length === 1 ? "comment" : "comments"}
  </p>
)}


                <p className="timestamp">
                  Posted on {new Date(post.created_at).toLocaleString()}
                </p>

                <div className="comment-section">
  <input
    type="text"
    placeholder="Add a comment..."
    value={newComment[post.id] || ''}
    onChange={(e) =>
      setNewComment({ ...newComment, [post.id]: e.target.value })
    }
  />
  <button onClick={() => handleCommentSubmit(post.id)}>Post</button>
</div>

              </div>
            );
          })}
        </div>
        {showModal && selectedPost && (
            <CommentModal
             post={{
            ...selectedPost,
             mediaType: selectedPost.video ? 'video' : 'image',
             mediaUrl: selectedPost.video
             ? fullUrl(selectedPost.video)
             : fullUrl(selectedPost.image),
             }}
             onClose={() => setShowModal(false)} />)}

   
      </div>

      <div className="suggestions">
        <p><strong>Suggested for you</strong></p>
        <ul>
          <li><span>donjazzy</span> <button>Follow</button></li>
          <li><span>sweetyfayee</span> <button>Follow</button></li>
          <li><span>rakhmanov_l1</span> <button>Follow</button></li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
