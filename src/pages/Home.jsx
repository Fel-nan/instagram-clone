import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access');

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    } else {
      const fetchPosts = async () => {
        try {
          const res = await axios.get('posts/', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setPosts(res.data);
        } catch (err) {
          console.error('Error fetching posts', err);
        }
      };

      fetchPosts();
    }
  }, [accessToken, navigate]);

  return (
    <div>
      <h2>Home Feed</h2>
      {posts.length === 0 ? (
        <p>No posts to show</p>
      ) : (
        posts.map(post => (
          <div key={post.id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
            <h4>{post.author.username}</h4>
            <img src={post.image} alt="post" style={{ width: '100%', maxWidth: '400px' }} />
            <p>{post.caption}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
