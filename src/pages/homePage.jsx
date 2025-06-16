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

const BASE_URL = "http://felnan.pythonanywhere.com";  // Replace with your real base URL

const HomePage = () => {
  const [postsData, setPostsData] = useState([]);
  const [likes, setLikes] = useState({});
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const isVideo = (url) => typeof url === 'string' && /\.(mp4|mov|webm)$/i.test(url);

  const fullUrl = (url) => {
    if (!url) return null;
    return url.startsWith("http") ? url : `${BASE_URL}${url}`;
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/posts/", { withCredentials: true });
      console.log("Fetched posts:", response.data);  // Debug: log all posts
      setPostsData(response.data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const toggleLike = (postId) => {
    setLikes((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
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
                      className={`like-icon ${likes[post.id] ? 'liked' : ''}`}
                      onClick={() => toggleLike(post.id)}
                    />
                    <FaRegComment className="comment-icon" />
                    <FiSend />
                  </div>
                  <div className='right-icon'><BsBookmark className="save-icon" /></div>
                </div>

                <p className="post-caption">
                  <strong>{post.user}</strong> {post.caption}
                </p>
                <p className="timestamp">
                  Posted on {new Date(post.created_at).toLocaleString()}
                </p>


                <div className="comment-section">
                  <input type="text" placeholder="Add a comment..." />
                  <button>Post</button>
                </div>
              </div>
            );
          })}
        </div>
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
