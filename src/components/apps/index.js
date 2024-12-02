import Terminal from './Terminal/Terminal';
import FileExplorer from './FileExplorer/FileExplorer';
// Import other app components as needed

export const apps = {
  terminal: {
    title: 'Terminal',
    component: Terminal,
    icon: '⌨️'
  },
  files: {
    title: 'Files',
    component: FileExplorer,
    icon: '📁'
  }
  // Add other apps as needed
};

export const appList = Object.keys(apps).map(key => ({
  id: key,
  ...apps[key]
})); 