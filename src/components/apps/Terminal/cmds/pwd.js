const pwd = (args, { currentPath }) => {
  return ['/' + currentPath.join('/')];
};

export default pwd; 