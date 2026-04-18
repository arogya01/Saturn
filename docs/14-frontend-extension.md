# Frontend Extension

## Goal
Understand how `saturn` can support a frontend SPA without confusing package management with bundling. This chapter covers the extension milestone.

## Why This Matters
Frontend projects are a tempting next step because they are visible and common. They also add a new layer of tooling that can blur the lesson if introduced too early. The purpose of this chapter is to show how far `saturn` can go on its own, and where additional build tooling begins to take over.

## Concept Explanation
A frontend SPA still needs the core services of a package manager:

- dependency declaration
- version resolution
- archive retrieval
- installation layout
- lockfile-based determinism
- script execution

What changes is the shape of the project workflow. Browser-facing applications usually depend on another layer that transforms source files, manages assets, and prepares bundles for the browser.

That means you should separate two questions:

- Can `saturn` install and expose the dependencies the project needs?
- Can the rest of the frontend toolchain consume those dependencies and build the app?

The first question belongs to `saturn`. The second involves bundlers or framework tooling.

## Saturn Focus
This extension should not change the core identity of `saturn`. It should show that:

- the same manifest and lockfile ideas still apply
- the same npm-backed dependency path still applies
- script execution becomes the bridge to frontend tooling
- package management is one layer in a larger app-build pipeline

If the frontend app works, that is useful evidence. If it requires additional tooling, that is also useful evidence because it clarifies the boundary of package-manager responsibility.

## Suggested Tasks
- Choose a small frontend project only after the Node app milestone is complete.
- Identify which parts of the workflow are still purely package management.
- Identify which steps depend on bundling or framework build behavior.
- Record where `saturn` ends and external tooling begins.

## Common Mistakes
- Interpreting bundler problems as package-manager failures.
- Expanding `saturn` to absorb frontend build responsibilities.
- Starting frontend work before the Node deployment milestone is stable.
- Losing sight of which parts of the system are universal versus ecosystem-specific.

## Checkpoint
You should be able to explain how `saturn` supports a frontend project and where frontend-specific tooling introduces separate concerns. This completes the extension milestone.

## Reflection Prompts
- Which parts of the frontend workflow felt identical to the Node app workflow?
- Which new concerns appeared only because the target was the browser?
- Why is it important not to let `saturn` drift into being a bundler?

## Preview
The final chapter looks beyond v1 and explains why production-grade package managers need more machinery than this course intentionally included.
