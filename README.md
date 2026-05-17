# Saturn 🪐

Saturn is a custom, experimental package manager for Node.js written in TypeScript. It aims to explore the fundamentals of dependency management, package resolution, and installation workflows by interacting directly with the npm registry.

## Features

- **Custom Manifests**: Uses a `saturn.json` file (instead of `package.json`) to manage your project's dependencies and configuration.
- **Project Initialization**: Easily scaffold a new project with a default manifest using `saturn init`.
- **Dependency Resolution**: Fetches package metadata from the npm registry and resolves dependency graphs.
- **Package Installation**: *(In Development)* Downloads and extracts tarballs to install dependencies.

## Architecture

The project is structured into modular components within the `src/` directory:

- `cli/`: Handles command-line argument parsing and routing.
- `workflows/`: Orchestrates high-level commands like `init` and `install`.
- `project/`: Manages the reading and writing of `saturn.json` project manifests.
- `registry/`: Contains the client for interacting with the npm registry API to fetch package metadata and tarballs.
- `resolver/`: Computes the dependency graph and resolves versions.
- `installer/`: Extracts downloaded tarballs into the local node_modules structure.
- `cache/`: *(In Development)* Manages a local cache of downloaded packages to speed up subsequent installs.

## Usage

You can run the CLI via `npm run dev` or by compiling the TypeScript code and executing `main.js`. 

*(Assuming standard setup with a CLI entrypoint)*

### Initialize a new project

Initialize a new project with a `saturn.json` file:

```bash
node dist/cli/main.js init [project-name] [directory]
```

### Install dependencies

Install dependencies listed in your `saturn.json`:

```bash
node dist/cli/main.js install
```

## Development Setup

1. Clone the repository
2. Install standard Node.js development dependencies (`npm install`)
3. Compile the TypeScript source code (`tsc` or your preferred build tool)

### Scripts

- `test`: Run the test suite (currently configured via native Node.js test runner).

## License

ISC
