const commandHelp = {
  about: [
    'NAME',
    '    about - display information about this terminal',
    '',
    'SYNOPSIS',
    '    about',
    '',
    'DESCRIPTION',
    '    Shows information about WyattOS Terminal and its creator.',
  ],
  banner: [
    'NAME',
    '    banner - display welcome banner',
    '',
    'SYNOPSIS',
    '    banner',
    '',
    'DESCRIPTION',
    '    Displays the WyattOS welcome banner and version information.',
  ],
  calc: [
    'NAME',
    '    calc - simple calculator',
    '',
    'SYNOPSIS',
    '    calc <expression>',
    '',
    'DESCRIPTION',
    '    Evaluates basic mathematical expressions.',
    '',
    'EXAMPLES',
    '    calc 2 + 2',
    '    calc 5 * 3',
    '    calc (10 - 5) * 2',
  ],
  cd: [
    'NAME',
    '    cd - change directory',
    '',
    'SYNOPSIS',
    '    cd [directory]',
    '',
    'DESCRIPTION',
    '    Change the current working directory.',
    '',
    'EXAMPLES',
    '    cd /home',
    '    cd ..',
    '    cd documents',
  ],
  clear: [
    'NAME',
    '    clear - clear terminal screen',
    '',
    'SYNOPSIS',
    '    clear',
    '',
    'DESCRIPTION',
    '    Clears the terminal screen.',
  ],
  // Add more command documentation as needed
};

const man = (args) => {
  if (!args.length) {
    throw new Error('What manual page do you want? (e.g., "man ls")');
  }

  const command = args[0].toLowerCase();
  const help = commandHelp[command];

  if (!help) {
    throw new Error(`No manual entry for ${command}`);
  }

  return help;
};

export default man; 