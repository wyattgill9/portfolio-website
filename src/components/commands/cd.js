// src/components/cd.js
import fileSystem from "../file-system";

const cd = (args, currentDir, currentPath) => {
  if (args.length === 0) {
    return ["Please specify a directory.", currentDir, currentPath];
  }

  const targetDir = args[0];

  // Navigate up one level if the target directory is '..'
  if (targetDir === "..") {
    if (currentPath.length === 0) {
      return ["Already at the root directory.", currentDir, currentPath];
    } else {
      const newPath = currentPath.slice(0, -1); // Remove the last directory from path
      const newDir = newPath.reduce((dir, subDir) => dir[subDir], fileSystem);
      return ["Moved up a directory.", newDir, newPath];
    }
  }

  // Attempt to navigate to the specified child directory
  const newDir = currentDir[targetDir];
  
  if (!newDir || typeof newDir !== "object") {
    return [`Directory not found or not a directory: ${targetDir}`, currentDir, currentPath];
  } else {
    const newPath = [...currentPath, targetDir];
    return [`Moved to ${targetDir}`, newDir, newPath];
  }
};

export default cd;
