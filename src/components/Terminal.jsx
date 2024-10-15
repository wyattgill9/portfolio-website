import React, { useState, useRef, useEffect } from "react";
import about from "./commands/about";
import cd from "./commands/cd"; // Adjust the path as necessary
import clear from "./commands/clear"; // Adjust the path as necessary
import contact from "./commands/contact"; // Adjust the path as necessary
import help from "./commands/help"; // Adjust the path as necessary
import ls from "./commands/ls"; // Adjust the path as necessary
import man from "./commands/man"; // Adjust the path as necessary
import projects from "./commands/projects"; // Adjust the path as necessary
import resume from "./commands/resume"; // Adjust the path as necessary
import website from "./commands/website"; // Adjust the path as necessary
import whoami from "./commands/whoami"; // Adjust the path as necessary

const Terminal = () => {
  const [history, setHistory] = useState([]);
  const [command, setCommand] = useState("");
  const inputRef = useRef(null);
  
  // Define initial currentDir and currentPath here if needed
  const [currentDir, setCurrentDir] = useState(null); // Set your initial directory
  const [currentPath, setCurrentPath] = useState([]); // Set your initial path

  useEffect(() => {
    inputRef.current.focus();
    setHistory([
      "Welcome to my portfolio! Type 'help' to see available commands.",
      "",
    ]);
  }, []);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      setHistory((prev) => [...prev, `$ ${command}`]);
      executeCommand(command);
      setCommand("");
    }
  };

  const executeCommand = (cmd) => {
    const parts = parseCommand(cmd); // Parse the command to get the command, args, and flags
    let output = [];

    switch (parts.command) {
      case "about":
        output = about();
        break;
      case "cd":
        const [cdOutput, newDir, newPath] = cd(parts.args, currentDir, currentPath);
        output = cdOutput;
        setCurrentDir(newDir);
        setCurrentPath(newPath);
        break;
      case "clear":
        output = clear();
        setHistory([]); // Clear the history
        break;
      case "contact":
        output = contact();
        break;
      case "help":
        output = help();
        break;
      case "ls":
        output = ls(currentDir);
        break;
      case "man":
        output = man(parts.args);
        break;
      case "projects":
        output = projects(parts.args, {}, (url) => {
          // Implement navigation logic here
        });
        break;
      case "resume":
        output = resume((url) => {
          // Implement navigation logic here
        });
        break;
      case "website":
        output = website();
        break;
      case "whoami":
        output = whoami();
        break;
      default:
        output = [`Command not found: ${parts.command}`];
        break;
    }

    setHistory((prev) => [...prev, ...output]);
  };

  return (
    <div className="terminal">
      <div className="output">
        {history.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <div className="input-line">
        <span className="prompt">visitor@wyatt:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyPress={handleCommand}
          autoFocus
        />
      </div>
    </div>
  );
};

export default Terminal;

// Add the parseCommand function at the bottom of this file
const parseCommand = (input) => {
  const parts = input.trim().split(/\s+/);
  const command = parts[0] ?? "";
  const args = [];
  const flags = {};

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith('-')) {
      flags[part] = true;
    } else if (part) {
      args.push(part);
    }
  }

  return { command, args, flags };
};
