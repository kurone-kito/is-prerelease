# Guidelines for AI Agents

This project is a CLI tool to determine if a given version string
represents a pre-release version based on semantic versioning (semver)
standards.

- Please write comments in English.
- Use the `pnpm run lint:fix` command to ensure code style quality.
- If you have further considerations, uncertainties, or better suggestions,
  please point them out, even if they seem minor. When doing so, provide at
  least one recommended solution. If in Plan mode, please resolve all these
  points before starting implementation.

## Development

### Install the dependencies

```sh
corepack enable
pnpm install
```

## Building

```sh
pnpm run build
```

### Linting

```sh
pnpm run lint
pnpm run lint:fix # Lint and auto-fix
```

### Testing

```sh
pnpm run test
```

### Cleaning

```sh
pnpm run clean
```
