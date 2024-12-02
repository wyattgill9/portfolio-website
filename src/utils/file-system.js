const fileSystem = {
  root: {
    home: {
      wyatt: {
        documents: {},
        downloads: {},
        pictures: {}
      }
    },
    usr: {
      bin: {},
      local: {}
    },
    etc: {}
  },

  // File type constants
  TYPE_FILE: 'file',
  TYPE_DIRECTORY: 'directory',
  
  exists(path) {
    let current = this.root;
    const parts = path.split('/').filter(p => p);
    
    for (const part of parts) {
      if (!current[part]) return false;
      current = current[part];
    }
    return true;
  },

  isDirectory(item) {
    return typeof item === 'object' && !item.content;
  },

  isFile(item) {
    return typeof item === 'object' && item.content !== undefined;
  },
  
  remove(path) {
    let current = this.root;
    const parts = path.split('/').filter(p => p);
    const target = parts.pop();
    
    for (const part of parts) {
      if (!current[part]) return false;
      current = current[part];
    }
    
    if (current[target]) {
      delete current[target];
      return true;
    }
    return false;
  },

  createFile(path, content = '') {
    let current = this.root;
    const parts = path.split('/').filter(p => p);
    const fileName = parts.pop();

    for (const part of parts) {
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }

    current[fileName] = {
      type: this.TYPE_FILE,
      content: content,
      created: new Date(),
      modified: new Date(),
      permissions: '644'
    };
    return true;
  },

  createDirectory(path) {
    let current = this.root;
    const parts = path.split('/').filter(p => p);
    const dirName = parts.pop();

    for (const part of parts) {
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }

    current[dirName] = {
      type: this.TYPE_DIRECTORY,
      created: new Date(),
      modified: new Date(),
      permissions: '755'
    };
    return true;
  },

  // Helper method to get directory at path
  getDirectory(path) {
    if (!path || path.length === 0) return this.root;
    
    let current = this.root;
    for (const dir of path) {
      if (!current[dir]) return null;
      current = current[dir];
    }
    return current;
  },

  // Get file content
  getFileContent(path) {
    let current = this.root;
    const parts = path.split('/').filter(p => p);
    const fileName = parts.pop();

    for (const part of parts) {
      if (!current[part]) return null;
      current = current[part];
    }

    if (current[fileName] && this.isFile(current[fileName])) {
      return current[fileName].content;
    }
    return null;
  },

  // Update file content
  updateFileContent(path, content) {
    let current = this.root;
    const parts = path.split('/').filter(p => p);
    const fileName = parts.pop();

    for (const part of parts) {
      if (!current[part]) return false;
      current = current[part];
    }

    if (current[fileName] && this.isFile(current[fileName])) {
      current[fileName].content = content;
      current[fileName].modified = new Date();
      return true;
    }
    return false;
  }
};

export default fileSystem;
