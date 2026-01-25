# 🆕 `@kurone-kito/is-prerelease`

A simple CLI app based on Node.js that determines whether a given version
is a pre-release version using [semver](https://www.npmjs.com/package/semver).

## Features

- Detects pre-release versions (e.g., `1.0.0-alpha.1`, `2.0.0-beta.3`)
- Returns exit codes for easy CI/CD integration
- Zero configuration required

## Requirements

- Node.js `^20.11 || ^22 || >=24`

## Installation

```sh
npm i -D @kurone-kito/is-prerelease
```

## Usage

### Command Syntax

```sh
is-prerelease <version> [pre]
```

### Arguments

| Argument  | Required | Description                                                                     |
| --------- | -------- | ------------------------------------------------------------------------------- |
| `version` | Yes      | The version string to check (JSON format, e.g., `"1.0.0"` or `"1.0.0-alpha.1"`) |
| `pre`     | No       | If provided, the command expects a pre-release version                          |

### Exit Codes

| Condition                                              | Exit Code     |
| ------------------------------------------------------ | ------------- |
| Pre-release version **and** `pre` argument provided    | `0` (success) |
| Stable version **and** `pre` argument **not** provided | `0` (success) |
| Otherwise                                              | `1` (failure) |

### Examples

#### Check if a version is a pre-release

```sh
# Returns exit code 0 if pre-release
is-prerelease '"1.0.0-alpha.1"' pre

# Returns exit code 0 if stable release
is-prerelease '"1.0.0"'
```

#### Integration with npm scripts

```json
{
  "scripts": {
    "is:prerelease": "is-prerelease $(npm pkg get version) pre",
    "is:release": "is-prerelease $(npm pkg get version)"
  }
}
```

> **Note:** `npm pkg get version` outputs a JSON-formatted string
> (e.g., `"1.0.0"`), which is the expected input format.

#### CI/CD Usage Example

```sh
# Publish to npm only if it's a pre-release version
if npm run is:prerelease; then
  npm publish --tag next
fi

# Publish to npm only if it's a stable release
if npm run is:release; then
  npm publish --tag latest
fi
```

## How It Works

This CLI uses the `prerelease()` function from the
[semver](https://www.npmjs.com/package/semver) package to detect
pre-release identifiers in version strings.

- `1.0.0` → Stable release (no pre-release identifier)
- `1.0.0-alpha.1` → Pre-release (identifier: `['alpha', 1]`)
- `2.0.0-beta.3` → Pre-release (identifier: `['beta', 3]`)

## Contributing

Welcome to contribute to this repository! For more details,
please refer to [CONTRIBUTING.md](.github/CONTRIBUTING.md).

## License

[MIT](./LICENSE)
