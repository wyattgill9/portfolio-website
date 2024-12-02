import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import AppLauncher from '../apps/AppLauncher/AppLauncher';
import { apps } from '../apps';

const LAUNCHER_WIDTH = 56;
const PADDING = 20;
const RIGHT_PADDING = 20;
const BOTTOM_PADDING = 20;
const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 500;

const WindowManager = () => {
  const [windows, setWindows] = useState([]);

  const calculateWindowLayout = (windows) => {
    const browserWidth = document.documentElement.clientWidth - LAUNCHER_WIDTH - (PADDING * 2);
    const browserHeight = document.documentElement.clientHeight - (PADDING * 2);
    const activeWindows = windows.filter(w => w.isVisible);

    if (activeWindows.length === 1) {
      // Single window - center it
      return activeWindows.map(win => ({
        ...win,
        position: { 
          x: LAUNCHER_WIDTH + (browserWidth - DEFAULT_WIDTH) / 2,
          y: PADDING + (browserHeight - DEFAULT_HEIGHT) / 4
        },
        size: { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT }
      }));
    } else if (activeWindows.length === 2) {
      // Two windows - split screen
      return activeWindows.map((win, index) => ({
        ...win,
        position: {
          x: index === 0 
            ? LAUNCHER_WIDTH + PADDING 
            : LAUNCHER_WIDTH + browserWidth/2 + (PADDING * 1.5),
          y: PADDING
        },
        size: {
          width: (browserWidth / 2) - (PADDING / 2),
          height: browserHeight
        }
      }));
    }
    return windows; // Return original windows if no special layout needed
  };

  // Auto-launch terminal on mount
  useEffect(() => {
    if (windows.length === 0) {
      const initialTerminal = {
        id: Date.now(),
        type: 'terminal',
        isVisible: true,
        position: { x: LAUNCHER_WIDTH + PADDING, y: PADDING },
        size: { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT }
      };
      setWindows([initialTerminal]);
    }
  }, []);

  const handleLaunchApp = (appType) => {
    const newWindow = {
      id: Date.now(),
      type: appType,
      isVisible: true,
      position: { x: LAUNCHER_WIDTH + PADDING, y: PADDING },
      size: { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT }
    };
    setWindows(prev => calculateWindowLayout([...prev, newWindow]));
  };

  useEffect(() => {
    const handleWindowCommand = (e) => {
      const { command, windowId } = e.detail;
      const browserWidth = document.documentElement.clientWidth - LAUNCHER_WIDTH - (PADDING * 2);
      const browserHeight = document.documentElement.clientHeight - (PADDING * 2);

      setWindows(prev => prev.map(win => {
        if (win.id !== windowId) return win;

        switch (command) {
          case 'left':
            return {
              ...win,
              position: { x: LAUNCHER_WIDTH + PADDING, y: PADDING },
              size: { 
                width: (browserWidth / 2) - (PADDING / 2),
                height: browserHeight
              }
            };
          case 'right':
            return {
              ...win,
              position: { 
                x: LAUNCHER_WIDTH + browserWidth/2 + (PADDING * 1.5),
                y: PADDING 
              },
              size: { 
                width: (browserWidth / 2) - (PADDING / 2),
                height: browserHeight
              }
            };
          case 'full':
            return {
              ...win,
              position: { x: LAUNCHER_WIDTH + PADDING, y: PADDING },
              size: { width: browserWidth, height: browserHeight }
            };
          case 'center':
            return {
              ...win,
              position: { 
                x: LAUNCHER_WIDTH + (browserWidth - DEFAULT_WIDTH) / 2,
                y: (browserHeight - DEFAULT_HEIGHT) / 2 + PADDING
              },
              size: { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT }
            };
          default:
            return win;
        }
      }));
    };

    document.addEventListener('window-command', handleWindowCommand);
    return () => document.removeEventListener('window-command', handleWindowCommand);
  }, []);

  const handleDrag = (id, e, data) => {
    const browserWidth = document.documentElement.clientWidth;
    const browserHeight = document.documentElement.clientHeight;
    const window = windows.find(w => w.id === id);
    
    if (!window) return;

    const x = Math.max(
      LAUNCHER_WIDTH + PADDING, 
      Math.min(data.x, browserWidth - RIGHT_PADDING - window.size.width)
    );
    const y = Math.max(
      PADDING, 
      Math.min(data.y, browserHeight - BOTTOM_PADDING - window.size.height)
    );

    setWindows(windows.map(win => 
      win.id === id ? { ...win, position: { x, y } } : win
    ));
  };

  const handleClose = (id) => {
    setWindows(prev => {
      const newWindows = prev.filter(win => win.id !== id);
      return calculateWindowLayout(newWindows);
    });
  };

  const handleMinimize = (id) => {
    setWindows(prev => prev.map(win => 
      win.id === id ? { ...win, isVisible: false } : win
    ));
  };

  const handleMaximize = (id) => {
    const browserWidth = document.documentElement.clientWidth - LAUNCHER_WIDTH - (PADDING * 2);
    const browserHeight = document.documentElement.clientHeight - (PADDING * 2);

    setWindows(prev => prev.map(win => 
      win.id === id ? {
        ...win,
        position: { x: LAUNCHER_WIDTH + PADDING, y: PADDING },
        size: { width: browserWidth, height: browserHeight }
      } : win
    ));
  };

  const renderApp = (window) => {
    const app = apps[window.type];
    if (!app) {
      console.error(`App type "${window.type}" not found`);
      return null;
    }
    const AppComponent = app.component;
    return <AppComponent windowId={window.id} />;
  };

  return (
    <div className="window-manager">
      <AppLauncher onLaunchApp={handleLaunchApp} />
      {windows.map(window => window.isVisible && apps[window.type] && (
        <Draggable
          key={window.id}
          position={window.position}
          onDrag={(e, data) => handleDrag(window.id, e, data)}
          handle=".window-header"
          bounds={{
            left: LAUNCHER_WIDTH + PADDING,
            top: PADDING,
            right: document.documentElement.clientWidth - RIGHT_PADDING - window.size.width,
            bottom: document.documentElement.clientHeight - BOTTOM_PADDING - window.size.height
          }}
        >
          <div 
            className="window"
            style={{
              width: window.size.width,
              height: window.size.height
            }}
          >
            <div className="window-header">
              <span className="window-title">{apps[window.type].title}</span>
              <div className="window-controls">
                <button className="minimize" onClick={() => handleMinimize(window.id)}>-</button>
                <button className="maximize" onClick={() => handleMaximize(window.id)}>□</button>
                <button className="close" onClick={() => handleClose(window.id)}>×</button>
              </div>
            </div>
            {renderApp(window)}
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default WindowManager; 