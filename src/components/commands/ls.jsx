const ls = (currentDir) => {
    if (!currentDir.children) return ["No contents"];
    return Object.keys(currentDir.children).map((key) => currentDir.children[key].type === "directory" ? `${key}/` : key);
  };
  
  export default ls;
  