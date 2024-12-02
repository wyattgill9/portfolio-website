import about from '../components/apps/Terminal/cmds/about';
import banner from '../components/apps/Terminal/cmds/banner';
import calc from '../components/apps/Terminal/cmds/calc';
import cd from '../components/apps/Terminal/cmds/cd';
import clear from '../components/apps/Terminal/cmds/clear';
import contact from '../components/apps/Terminal/cmds/contact';
import echo from '../components/apps/Terminal/cmds/echo';
import help from '../components/apps/Terminal/cmds/help';
import ls from '../components/apps/Terminal/cmds/ls';
import man from '../components/apps/Terminal/cmds/man';
import pwd from '../components/apps/Terminal/cmds/pwd';
import system from '../components/apps/Terminal/cmds/system';
import weather from '../components/apps/Terminal/cmds/weather';
import website from '../components/apps/Terminal/cmds/website';
import whoami from '../components/apps/Terminal/cmds/whoami';
import window from '../components/apps/Terminal/cmds/window';
import starship from '../components/apps/Terminal/cmds/starship';

const commands = {
  about,
  banner,
  calc,
  cd,
  clear,
  contact,
  echo,
  help,
  ls,
  man,
  pwd,
  system,
  weather,
  website,
  whoami,
  window,
  starship,
};

export const executeCommand = async (command, args, context) => {
  const cmd = commands[command];
  
  if (!cmd) {
    throw new Error(`Command not found: ${command}`);
  }

  try {
    return await cmd(args, context);
  } catch (error) {
    throw new Error(`Error executing ${command}: ${error.message}`);
  }
}; 