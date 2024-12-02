import React from 'react';
import { appList } from '../index';
import './AppLauncher.css';

const AppLauncher = ({ onLaunchApp }) => {
  return (
    <div className="app-launcher">
      <div className="app-icons">
        {appList.map(app => (
          <button
            key={app.id}
            className="app-icon"
            onClick={() => onLaunchApp(app.id)}
            title={app.title}
          >
            {app.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AppLauncher; 