import React from 'react';
import './FileExplorer.css';

const FileExplorer = ({ windowId }) => {
  return (
    <div className="file-explorer">
      <div className="file-explorer-sidebar">
        <div className="sidebar-item">
          <span className="icon">🏠</span>
          <span>Home</span>
        </div>
        <div className="sidebar-item">
          <span className="icon">📄</span>
          <span>Documents</span>
        </div>
        <div className="sidebar-item">
          <span className="icon">⬇️</span>
          <span>Downloads</span>
        </div>
      </div>
      <div className="file-explorer-content">
        <div className="file-explorer-header">
          <input type="text" placeholder="Search files..." />
        </div>
        <div className="file-list">
          <div className="file-item">
            <span className="icon">📄</span>
            <span>README.md</span>
          </div>
          <div className="file-item">
            <span className="icon">📁</span>
            <span>Projects</span>
          </div>
          <div className="file-item">
            <span className="icon">📁</span>
            <span>Documents</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer; 