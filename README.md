# opencode-shell-commands

An [OpenCode](https://opencode.ai) plugin that lets you execute shell for custom commands, skipping the LLM entirely.

## Install

Add the plugin to your `opencode.json`:

```jsonc
{
  "plugin": ["opencode-shell-commands"],
}
```

## Usage

1. Add a custom command that starts with `!`:

```jsonc
// opencode.json
{
  "command": {
    "code": { "template": "!code .", "description": "Opened VS Code" },
  },
}
```

2. Type `/code` and VS Code opens instantly. No LLM round-trip.

## Examples

### Open current workspace in Cursor

```jsonc
// opencode.json
{
  "command": {
    "cursor": { "template": "!cursor .", "description": "Opened Cursor" },
  },
}
```

### Open current workspace in Zed

```jsonc
// opencode.json
{
  "command": {
    "zed": { "template": "!zed .", "description": "Opened Zed" },
  },
}
```

### Run pnpm commands

```jsonc
// opencode.json
{
  "command": {
    "format": { "template": "!pnpm format", "description": "Formatted code" },
    "test": { "template": "!pnpm test", "description": "Tests passed" },
  },
}
```

### Run npm commands

```jsonc
// opencode.json
{
  "command": {
    "lint": { "template": "!npm run lint", "description": "Linted code" },
    "build": { "template": "!npm run build", "description": "Build complete" },
  },
}
```

### Run bun commands

```jsonc
// opencode.json
{
  "command": {
    "check": { "template": "!bun run check", "description": "Checks passed" },
    "dev": { "template": "!bun run dev", "description": "Dev server started" },
  },
}
```

### Git shortcuts

```jsonc
// opencode.json
{
  "command": {
    "gcm": {
      "template": "!git checkout main",
      "description": "Checked out main",
    },
    "gs": { "template": "!git status", "description": "Git status" },
  },
}
```

## How it works

1. On startup, the plugin scans your commands for `!` prefixed templates
2. When you run one of those commands, the `command.execute.before` hook intercepts it
3. The shell command runs via `sh -c` in your workspace
4. If the command produces output (e.g. `git status`), it's added to the session context
5. If the command is silent (e.g. `cursor .`), a toast confirms success
6. The LLM call is skipped in both cases

## License

MIT
