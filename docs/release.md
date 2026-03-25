# Release process

## Prerequisites

- npm trusted publishing configured on [npmjs.com](https://www.npmjs.com/package/opencode-shell-commands/access) (Settings > Trusted Publisher > GitHub Actions)
  - Organization/user: `lucleray`
  - Repository: `opencode-shell-commands`
  - Workflow filename: `publish.yml`
  - Environment name: `npm`

No `NPM_TOKEN` secret needed — publishing uses OIDC.

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

3. The `publish.yml` workflow will trigger, then wait for your approval on the `npm` environment before publishing.

## What happens

- `ci.yml` runs on every push to `main` and on PRs — builds and typechecks
- `publish.yml` runs only when a `v*` tag is pushed — builds and publishes to npm via OIDC (no tokens)

## Manual publish

If you need to publish manually:

```bash
bun install
bun run build
npm publish --access public
```
