import fileSystem from '../../../../utils/file-system';

const rm = (args, { currentPath }) => {
  if (!args.length) {
    throw new Error('rm: missing operand');
  }

  const path = [...currentPath, args[0]];
  if (!fileSystem.remove(path.join('/'))) {
    throw new Error(`rm: cannot remove '${args[0]}': No such file or directory`);
  }

  return [''];
};

export default rm; 