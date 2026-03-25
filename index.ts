import type { Plugin } from '@opencode-ai/plugin';

const SHELL_PREFIX = '!';

export const ShellCommandsPlugin: Plugin = async ({ $, client, directory }) => {
  const shellCommands: Record<string, { command: string; message: string }> =
    {};

  return {
    config: async (input) => {
      if (!input.command) return;
      for (const [name, cmd] of Object.entries(input.command)) {
        if (cmd.template.startsWith(SHELL_PREFIX)) {
          const shellCmd = cmd.template.slice(SHELL_PREFIX.length).trim();
          shellCommands[name] = {
            command: shellCmd,
            message: cmd.description || `Ran /${name}`,
          };
        }
      }
    },
    'command.execute.before': async (input) => {
      const entry = shellCommands[input.command];
      if (!entry) return;
      await $`sh -c ${entry.command}`.cwd(directory);
      await client.tui.showToast({
        body: { message: entry.message, variant: 'success' },
      });
      throw new Error('skip');
    },
  };
};
