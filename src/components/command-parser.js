/**
 * @typedef {Object} ParsedCommand
 * @property {string} command - The main command to execute.
 * @property {string[]} args - The arguments provided with the command.
 * @property {Object<string, boolean>} flags - The flags associated with the command.
 */

/**
 * Parses a command input string into its components: command, arguments, and flags.
 * @param {string} input - The input command string.
 * @returns {ParsedCommand} The parsed command with command, args, and flags.
 */
export const parseCommand = (input) => {
  const parts = input.trim().split(/\s+/);
  const command = parts[0] ?? "";
  const args = [];
  const flags = {};

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    if (part?.startsWith('-')) {
      flags[part] = true;
    } else if (part) {
      args.push(part);
    }
  }

  return { command, args, flags };
};
