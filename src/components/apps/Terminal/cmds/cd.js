import fileSystem from '../../../../utils/file-system';

const cd = (args, { currentPath, setCurrentPath }) => {
  if (!args.length) {
    setCurrentPath([]); // Return to root
    return [''];
  }

  const path = args[0];
  const parts = path.split('/').filter(p => p);

  if (path.startsWith('/')) {
    // Absolute path
    if (!fileSystem.exists('/' + parts.join('/'))) {
      throw new Error('Directory not found');
    }
    setCurrentPath(parts);
  } else {
    // Relative path
    const newPath = [...currentPath];
    
    for (const part of parts) {
      if (part === '..') {
        newPath.pop();
      } else if (part !== '.') {
        newPath.push(part);
      }
    }

    if (!fileSystem.getDirectory(newPath)) {
      throw new Error('Directory not found');
    }
    setCurrentPath(newPath);
  }

  return [''];
};

export default cd; 