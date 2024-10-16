// src/components/remove.js

import fileSystem from "../file-system";

export const remove = (args) => {
    if (!args || args.length === 0) {
        return 'Error: Please specify a file or directory to remove.';
    }

    const path = args[0];

    if (!fileSystem.exists(path)) {
        return `Error: ${path} does not exist.`;
    }

    const removed = fileSystem.remove(path);

    if (removed) {
        return `${path} has been removed successfully.`;
    } else {
        return `Error: Failed to remove ${path}.`;
    }
};

export default remove;
