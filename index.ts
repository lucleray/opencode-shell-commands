import type { Plugin } from '@opencode-ai/plugin';

const PREFIX = '!';

export const ShellCommandsPlugin: Plugin = async ({ $, client, directory }) => {
  const commands: Record<string, { run: string; message: string }> = {};

  return {
    config: async (input) => {
      if (!input.command) return;
      for (const [name, cmd] of Object.entries(input.command)) {
        if (cmd.template.startsWith(PREFIX)) {
          commands[name] = {
            run: cmd.template.slice(PREFIX.length).trim(),
            message: cmd.description || `Ran /${name}`,
          };
        }
      }
    },
    'command.execute.before': async (input) => {
      const cmd = commands[input.command];
      if (!cmd) return;
      await $`sh -c ${cmd.run}`.cwd(directory);
      await client.tui.showToast({
        body: { message: cmd.message, variant: 'success' },
      });
      throw new Error('skip');
    },
  };
};
