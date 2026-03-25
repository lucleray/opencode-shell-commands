# Release process

## Prerequisites

- `NPM_TOKEN` secret set in GitHub repo settings (Settings > Secrets > Actions)
- npm account with publish access to `opencode-shell-commands`

## How to release

1. Bump the version in `package.json`:

```bash
npm version patch  # 0.1.0 -> 0.1.1
npm version minor  # 0.1.0 -> 0.2.0
npm version major  # 0.1.0 -> 1.0.0
```

2. Push the commit and tag:

```bash
git push origin main --follow-tags
```

3. The `publish.yml` workflow will automatically build and publish to npm.

## What happens

- `ci.yml` runs on every push to `main` and on PRs — builds and typechecks
- `publish.yml` runs only when a `v*` tag is pushed — builds and publishes to npm

## Manual publish

If you need to publish manually:

```bash
bun install
bun run build
npm publish --access public
```
