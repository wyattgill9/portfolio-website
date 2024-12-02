import React, { useState, useRef, useEffect } from 'react';
import { executeCommand } from '../../../utils/command-handler';
import './Terminal.css';

const Terminal = ({ windowId }) => {
  const [history, setHistory] = useState(() => {
    // Check if this is the first time opening the terminal
    const hasSeenBanner = localStorage.getItem('hasSeenBanner');
    if (!hasSeenBanner) {
      localStorage.setItem('hasSeenBanner', 'true');
      return [{
        type: 'output',
        content: [
          '██╗    ██╗██╗   ██╗ █████╗ ████████╗████████╗',
          '██║    ██║╚██╗ ██╔╝██╔══██╗╚══██╔══╝╚══██╔══╝',
          '██║ █╗ ██║ ╚████╔╝ ███████║   ██║      ██║   ',
          '██║███╗██║  ╚██╔╝  ██╔══██║   ██║      ██║   ',
          '╚███╔███╔╝   ██║   ██║  ██║   ██║      ██║   ',
          ' ╚══╝╚══╝    ╚═╝   ╚═╝  ╚═╝   ╚═╝      ╚═╝   ',
          '',
          'Welcome to Wyatt\'s Terminal! Type "help" for a list of commands.',
          ''
        ]
      }];
    }
    return []; // Return empty history if banner has been seen before
  });
  const [currentPath, setCurrentPath] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [prompt, setPrompt] = useState('default');
  
  const inputRef = useRef(null);
  const historyRef = useRef(null);

  const getPrompt = () => {
    if (prompt === 'starship') {
      return (
        <span className="terminal-prompt starship">
          <span className="icon">⭐</span>
          <span className="directory">~{currentPath.join('/')}</span>
          <span className="arrow">❯</span>
        </span>
      );
    }
    
    return (
      <span className="terminal-prompt default">
        <span className="terminal-user">visitor</span>
        <span className="terminal-at">@</span>
        <span className="terminal-host">wyatt-term</span>
        <span className="terminal-colon">:</span>
        <span className="terminal-path">~{currentPath.join('/')}</span>
        <span className="terminal-dollar">$ </span>
      </span>
    );
  };

  const addToHistory = (entry) => {
    setHistory(prev => [...prev, entry]);
  };

  const handleCommand = async (input) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Add command to command history
    setCommandHistory(prev => [...prev, trimmedInput]);
    setHistoryIndex(-1);

    // Add input to display history with prompt
    addToHistory({
      type: 'command',
      content: trimmedInput
    });

    // Parse command and arguments
    const [command, ...args] = trimmedInput.split(' ');

    try {
      const output = await executeCommand(command.toLowerCase(), args, {
        currentPath,
        setCurrentPath,
        clearHistory: () => setHistory([]),
        windowId,
        setPrompt
      });

      if (output && output.length > 0) {
        addToHistory({
          type: 'output',
          content: output
        });
      }
    } catch (error) {
      addToHistory({
        type: 'error',
        content: [error.message]
      });
    }

    setCurrentInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > -1) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(
          newIndex === -1 
            ? '' 
            : commandHistory[commandHistory.length - 1 - newIndex] || ''
        );
      }
    }
  };

  useEffect(() => {
    handleCommand('banner');
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-history" ref={historyRef}>
        {history.map((entry, index) => (
          <div key={index} className={`terminal-entry ${entry.type}`}>
            {entry.type === 'command' ? (
              <div className="terminal-line">
                {getPrompt()}
                <span>{entry.content}</span>
              </div>
            ) : (
              entry.content.map((line, i) => (
                <div key={i} className="terminal-line">{line}</div>
              ))
            )}
          </div>
        ))}
        <div className="terminal-input-line">
          {getPrompt()}
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;