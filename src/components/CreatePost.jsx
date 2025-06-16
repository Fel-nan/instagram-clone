import React, { useState } from 'react';
import axios from '../api/axios';
import '../styles/CreatePost.css';

const CreatePost = ({ isOpen, onClose, onPostCreated }) => {
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('accessToken');

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setError('');

    if (!file) return;

    const isValidType = file.type.startsWith('image/') || file.type.startsWith('video/');
    const isValidSize = file.size <= 20 * 1024 * 1024; // 20MB max

    if (!isValidType) {
      setError('Please upload a valid image or video file.');
      return;
    }

    if (!isValidSize) {
      setError('File size must be 20MB or less.');
      return;
    }

    setMedia(file);
    const url = URL.createObjectURL(file);
    setPreview({ url, type: file.type.startsWith('video') ? 'video' : 'image' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!media || !caption.trim()) {
      setError('Both media and caption are required.');
      return;
    }

    const formData = new FormData();
    if (media.type.startsWith('image/')) {
  formData.append('image', media);
} else if (media.type.startsWith('video/')) {
  formData.append('video', media);
}
    formData.append('caption', caption.trim());

    try {
      setLoading(true);
      await axios.post('/api/posts/', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data', 
          'Authorization': `Bearer ${token}` },
      });

      // Reset and close
      setMedia(null);
      setCaption('');
      setPreview(null);
      onClose();
      onPostCreated();
    } catch (err) {
      console.error('Post creation failed:', err);
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>Create New Post</h3>

        {error && <p className="error">{error}</p>}
        {loading && <p className="progress">Uploading...</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            disabled={loading}
          />

          {preview && (
            preview.type === 'image' ? (
              <img src={preview.url} alt="preview" className="preview" />
            ) : (
              <video src={preview.url} controls className="preview" />
            )
          )}

          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            disabled={loading}
          />

          <button type="submit" disabled={!media || !caption.trim() || loading}>
            {loading ? 'Sharing...' : 'Share'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
