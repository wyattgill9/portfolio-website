import fileSystem from '../../../../utils/file-system';

const cat = (args, { currentPath }) => {
  if (!args.length) {
    throw new Error('cat: missing file operand');
  }

  const path = [...currentPath, args[0]].join('/');
  const content = fileSystem.getFileContent(path);
  
  if (content === null) {
    throw new Error(`cat: ${args[0]}: No such file`);
  }

  return content.split('\n');
};

export default cat; 