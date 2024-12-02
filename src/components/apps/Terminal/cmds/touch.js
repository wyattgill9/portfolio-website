import fileSystem from '../../../../utils/file-system';

const touch = (args, { currentPath }) => {
  if (!args.length) {
    throw new Error('touch: missing file operand');
  }

  const path = [...currentPath, args[0]].join('/');
  if (!fileSystem.createFile(path)) {
    throw new Error(`touch: cannot create file '${args[0]}'`);
  }

  return [''];
};

export default touch; 