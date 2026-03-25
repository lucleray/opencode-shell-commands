# opencode-shell-commands

An [OpenCode](https://opencode.ai) plugin that lets you run shell commands directly from custom commands, skipping the LLM entirely.

## Why?

OpenCode custom commands always go through the LLM, even for simple tasks like opening an editor. This plugin intercepts commands prefixed with `!` and runs them as shell commands instead — instant execution, no tokens wasted.

## Install

Add the plugin to your `opencode.json`:

```json
{
  "plugin": ["opencode-shell-commands"]
}
```

Or copy `index.ts` into `~/.config/opencode/plugins/`.

## Usage

Define commands in your `opencode.json` with a `!` prefix in the template:

```json
{
  "command": {
    "cursor": {
      "template": "!cursor .",
      "description": "Opened Cursor"
    },
    "code": {
      "template": "!code .",
      "description": "Opened VS Code"
    },
    "format": {
      "template": "!pnpm format",
      "description": "Formatted code"
    }
  }
}
```

Then run them in OpenCode:

```
/cursor
/code
/format
```

The shell command runs immediately in the workspace directory. A toast notification shows the `description` on success.

## How it works

1. On startup, the plugin scans your commands for `!` prefixed templates
2. When you run one of those commands, the `command.execute.before` hook intercepts it
3. The shell command runs directly via `sh -c` in your workspace
4. A toast confirms success, and the LLM call is skipped

## License

MIT
