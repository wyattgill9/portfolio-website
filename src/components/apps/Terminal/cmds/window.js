const window = (args, { windowId }) => {
  if (!args.length) {
    throw new Error('window: missing command (try: left, right, full, center)');
  }

  const command = args[0].toLowerCase();
  const validCommands = ['left', 'right', 'full', 'center'];

  if (!validCommands.includes(command)) {
    throw new Error(`window: invalid command '${command}'`);
  }

  // Dispatch window command event with windowId
  document.dispatchEvent(new CustomEvent('window-command', {
    detail: { command, windowId }
  }));

  return [''];
};

export default window; 