import fileSystem from '../../../../utils/file-system';

const mkdir = (args, { currentPath }) => {
  if (!args.length) {
    throw new Error('mkdir: missing operand');
  }

  const dir = fileSystem.getDirectory(currentPath);
  if (!dir) {
    throw new Error('Current directory not found');
  }

  const dirName = args[0];
  if (dir[dirName]) {
    throw new Error(`mkdir: cannot create directory '${dirName}': File exists`);
  }

  dir[dirName] = {};
  return [''];
};

export default mkdir; 