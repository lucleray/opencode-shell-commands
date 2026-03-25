# Release process

## Prerequisites

- npm trusted publishing configured on [npmjs.com](https://www.npmjs.com/package/opencode-shell-commands/access) (Settings > Trusted Publisher > GitHub Actions)
  - Organization/user: `lucleray`
  - Repository: `opencode-shell-commands`
  - Workflow filename: `publish.yml`
  - Environment name: `npm`

No `NPM_TOKEN` secret needed — publishing uses OIDC.

## How to release

1. Bump the version in `package.json`

2. Commit, tag, and push:

```bash
git add -A && git commit -m "v0.x.x"
git tag v0.x.x -m "v0.x.x"
git push origin main --follow-tags
```

3. Approve the release on the `npm` environment in [GitHub Actions](https://github.com/lucleray/opencode-shell-commands/actions).

## What happens

- `ci.yml` runs on every push to `main` and on PRs — builds and typechecks
- `publish.yml` runs when a `v*` tag is pushed — waits for approval, then publishes to npm via OIDC

## Manual publish

If you need to publish manually:

```bash
bun install
bun run build
npm publish --access public
```
