import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import '../styles/CommentModal.css';

const CommentModal = ({ post, onClose }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);

  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/posts/${post.id}/comments/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setComments(response.data);
      } catch (err) {
        console.error('Failed to fetch comments:', err.response?.data || err.message);
      }
    };

    fetchComments();
  }, [post.id]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `/api/posts/${post.id}/add_comment/`,
        { content: newComment },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

      // Append new comment manually
      const newCommentObj = {
        user: post.username || 'You', // fallback if not returned by backend
        text: newComment,
      };

      setComments((prev) => [...prev, newCommentObj]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to post comment:', err.response?.data || err.message || err);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="comment-modal" onClick={(e) => e.stopPropagation()}>
        {/* Media */}
        <div className="modal-left">
          {post.mediaType === 'video' ? (
            <video src={post.mediaUrl} controls />
          ) : (
            <img src={post.mediaUrl} alt="Post" />
          )}
        </div>

        {/* Comments Section */}
        <div className="modal-right">
          <div className="modal-header">
  <strong>{post.username}</strong>
  <span className="comment-count">{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</span>
</div>

          <div className="modal-comments">
            {comments.map((comment, index) => (
              <div key={index} className="single-comment">
                <strong>{comment.user_username}</strong> {comment.content}
              </div>
            ))}
          </div>

          <div className="modal-input">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleCommentSubmit}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
