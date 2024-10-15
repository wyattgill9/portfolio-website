const ls = (currentDir) => {
  if (!currentDir || typeof currentDir !== "object") {
    return ["This is not a directory or does not contain any items."];
  }

  const contents = Object.keys(currentDir);
  return contents.length > 0 ? contents : ["This directory is empty."];
};

export default ls;