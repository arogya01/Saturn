Here’s a clean draft you can adapt for docs/02-designing-saturns-scope.md.

V1 Promise
Saturn v1 is a consumer-side package manager for a Node.js project. Its core promise is that it can install a project’s dependencies, record the exact resolved versions, and reproduce the same dependency environment later so the project can run reliably, including in a production-style deployment setting.

Minimum User Story
As a developer deploying a Node.js app, I want saturn to install and reproduce my app’s dependency tree reliably so the app behaves the same across development and production environments.

What V1 Includes

Reading local project metadata to know which dependencies the project wants.
Resolving direct and transitive dependencies to exact versions.
Looking up package metadata from the npm registry.
Downloading package tarballs from npm-hosted URLs.
Storing downloaded artifacts in a local cache.
Installing dependencies into a usable on-disk layout for the project.
Generating and reusing a lockfile for deterministic installs.
Running project scripts in the installed environment.
Handling real failures such as missing packages or network errors.
What V1 Does Not Include

Publishing packages to a registry.
Private registries or authentication.
Workspaces or multi-project coordination.
Peer dependency negotiation.
Advanced hoisting or deduplication strategies.
Multi-platform binary management.
Security policy systems or signature verification.
Successful Install Means
A successful install should be observable, not just internal. For me, that means:

saturn reads the project manifest and resolves a complete dependency tree.
The required packages are fetched and stored locally.
The dependencies are installed into the project in a usable layout.
A lockfile is written that records the exact resolved versions.
Running install again with the same manifest reproduces the same result.
The Node.js app can run successfully using the installed dependencies.
Why This Scope
The main goal of saturn v1 is not to compete with mature package managers. The goal is to understand and build the core dependency-management loop clearly enough that a real Node.js application can be installed and run in a repeatable way. That is why deployment and determinism matter more than advanced ecosystem features in the first version.

If you want, I can next help you write the “three most important commands” section for Chapter 2 in a way that naturally leads into docs/03-cli-and-project-layout.md.