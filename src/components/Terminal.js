import React, { useState, useRef, useEffect } from "react";
import about from "./commands/about";
import cd from "./commands/cd";
import clear from "./commands/clear";
import contact from "./commands/contact";
import help from "./commands/help";
import ls from "./commands/ls";
import man from "./commands/man";
import projects from "./commands/projects";
import resume from "./commands/resume";
import website from "./commands/website";
import whoami from "./commands/whoami";

const Terminal = () => {
  const [history, setHistory] = useState([]);
  const [command, setCommand] = useState("");
  const inputRef = useRef(null);
  const [currentDir, setCurrentDir] = useState("home");
  const [currentPath, setCurrentPath] = useState(["home"]);

  useEffect(() => {
    inputRef.current.focus();
    setHistory([
      "Welcome to my Linux-style portfolio! Type 'help' for commands.",
      ""
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
    const parts = parseCommand(cmd);
    let output = [];

    switch (parts.command) {
      case "about":
        output = about();
        break;
      case "cd":
        const [cdOutput, newDir, newPath] = cd(parts.args, currentDir, currentPath);
        output = cdOutput;
        setCurrentDir(newDir || currentDir);
        setCurrentPath(newPath || currentPath);
        break;
      case "clear":
        output = clear();
        setHistory([]);
        return;
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
          window.open(url, "_blank");
        });
        break;
      case "resume":
        output = resume((url) => {
          window.open(url, "_blank");
        });
        break;
      case "website":
        output = website();
        break;
      case "whoami":
        output = whoami();
        break;
      default:
        output = [`bash: ${parts.command}: command not found`];
        break;
    }

    setHistory((prev) => [...prev, ...output]);
  };

  return (
    <div className="terminal" onClick={() => inputRef.current.focus()}>
      <div className="output">
        {history.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <div className="input-line">
        <span className="prompt">visitor@linux-portfolio:{currentPath.join("/")} $</span>
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyPress={handleCommand}
          autoFocus
          className="terminal-input"
        />
      </div>
    </div>
  );
};

export default Terminal;

// Parse Command Function
const parseCommand = (input) => {
  const parts = input.trim().split(/\s+/);
  const command = parts[0] ?? "";
  const args = parts.slice(1);
  return { command, args };
};
