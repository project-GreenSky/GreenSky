import React, { useState } from 'react';
import "./AirQualityBlog.css";
import { blogs } from '@/lib/utils';

const AirQualityBlog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const closeModal = () => {
    setSelectedBlog(null);
  };

  return (
    <div className="blog-page">
      <header>
        <h1>Air Quality Insights</h1>
        <p>Exploring the importance of clean air for a healthier future</p>
      </header>


      <main>
        <div className="blog-grid">
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-card" onClick={() => handleBlogClick(blog)}>
              <img src={blog.image} alt={blog.title} />
              <h2>{blog.title}</h2>
            </div>
          ))}
        </div>
      </main>
      {selectedBlog && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>×</button>
            <h2>{selectedBlog.title}</h2>
            <img src={selectedBlog.image} alt={selectedBlog.title} />
            <p>{selectedBlog.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AirQualityBlog;