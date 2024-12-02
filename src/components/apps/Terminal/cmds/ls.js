import fileSystem from '../../../../utils/file-system';

const ls = (args, { currentPath }) => {
  const dir = fileSystem.getDirectory(currentPath);
  if (!dir) {
    throw new Error('Directory not found');
  }

  // Get contents of current directory
  const contents = Object.keys(dir);
  
  // If no contents, return empty array to show empty directory
  if (contents.length === 0) {
    return [''];
  }

  // Return array of directory contents
  return [contents.join('  ')];
};

export default ls;
