import React from 'react';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  // Dummy data to simulate backend
  const profile = {
    username: 'nana_shot_it',
    full_name: 'Felix',
    pronouns: 'he/him/his',
    profile_picture: '/default-avatar.png',
    bio: 'Photography at its best 💯',
    website: 'https://instagram.com/nana_shot_it',
    post_count: 12,
    followers_count: 1286,
    following_count: 642,
    posts: [
      '/images/cat.jpg',
      '/images/sky.jpg',
      '/images/thankyou.jpg',
      '/images/camera.jpg',
      '/images/nature.jpg',
      '/images/city.jpg',
    ],
  };

  return (
    <div className="profile-wrapper">
      {/* Header */}
      <div className="profile-header">
        <img src={profile.profile_picture} alt="avatar" className="profile-avatar" />

        <div className="profile-info">
          <div className="top-row">
            <h2>{profile.username}</h2>
            <button className="btn">Edit Profile</button>
            <button className="btn secondary">View archive</button>
            <span className="icon-btn">⚙️</span>
          </div>

          <div className="stats">
            <span><strong>{profile.post_count}</strong> posts</span>
            <span><strong>{profile.followers_count}</strong> followers</span>
            <span><strong>{profile.following_count}</strong> following</span>
          </div>

          <div className="bio">
            <strong>{profile.full_name}</strong> <span className="pronouns">{profile.pronouns}</span>
            <div className="username-badge">@{profile.username}</div>
            <p>{profile.bio}</p>
            <a href={profile.website} target="_blank" rel="noreferrer">{profile.website}</a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <div className="tab active">
          <span className="icon">▦</span> POSTS
        </div>
        <div className="tab">
          <span className="icon">🔖</span> SAVED
        </div>
      </div>

      {/* Post Grid */}
      <div className="post-grid">
        {profile.posts.map((img, index) => (
          <img key={index} src={img} alt="post" className="post-grid-item" />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
