import React, { useState }  from 'react';
import '../styles/HomePage.css';
import { FaHome, FaSearch, FaCompass, FaPlus, FaHeart, FaRegHeart, FaRegComment} from 'react-icons/fa';
import { BsCameraReels, BsBookmark } from 'react-icons/bs';
import { FiMoreHorizontal, FiSend } from 'react-icons/fi';

const postsData = [
  {
    id: 1,
    user: 'user1',
    img: 'https://picsum.photos/500/300?random=1',
    caption: 'Enjoying the view!',
  },
  {
    id: 2,
    user: 'user2',
    img: 'https://picsum.photos/500/300?random=2',
    caption: 'Lunchtime!',
  },
];
const HomePage = () => {
  const [likes, setLikes] = useState({});

  const toggleLike = (postId) => {
    setLikes((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };
  return (
    <div className="homepage">
      <div className="sidebar">
        <h2 className="logo">Instagram</h2>
        <nav>
          <ul>
            <li><FaHome /> <span className="nav-label">Home</span></li>
            <li><FaSearch /> <span className="nav-label">Search</span></li>
            <li><FaCompass /> <span className="nav-label">Explore</span></li>
            <li><BsCameraReels /> <span className="nav-label">Reels</span></li>
            <li><FaHeart /> <span className="nav-label">Notifications</span></li>
            <li><FaPlus /> <span className="nav-label">Create</span></li>
            <li className="mobile-only"><FiSend /></li>
          </ul>
        </nav>
        <div className="profile-link">Profile</div>
      </div>

       <div className="feed">
        <div className="stories">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div className="story" key={idx}>
              <img src={`https://i.pravatar.cc/60?img=${idx + 1}`} alt="story" className="story-img" />
              <p className="story-username">user{idx + 1}</p>
            </div>
          ))}
        </div>

        <div className="message-button">
          <FiSend size={22} />
        </div>

        <div className="posts">
          {postsData.map((post) => (
            <div className="post" key={post.id}>
              <div className="post-header">
                <div className="post-user">{post.user}</div>
                <FiMoreHorizontal className="post-options" />
              </div>
              <img src={post.img} alt="post" className="post-img" />
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
               <div className="comment-section">
                 <input type="text" placeholder="Add a comment..." />
                 <button>Post</button>
               </div>
            </div>
          ))}
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