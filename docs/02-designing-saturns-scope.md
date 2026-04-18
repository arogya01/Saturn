# Designing Saturn's Scope

## Goal
Define a v1 scope that is ambitious enough to teach the right concepts and narrow enough to finish. By the end of this chapter, you should know exactly what `saturn` is responsible for in this course.

## Why This Matters
Scope is a technical decision, not just a project-management concern. A package manager can expand endlessly: publishing, workspaces, security policies, native builds, mirrors, private registries, compression formats, platform targeting, performance optimizations. If you start with all of that in mind, you will not finish a learning project.

Good scope protects learning. It keeps each chapter tied to one problem at a time.

## Concept Explanation
For this course, `saturn` is a consumer-side package manager for a Node-based project. Its job is to help one project declare dependencies, resolve them, fetch them, install them, record deterministic state, and run scripts.

That means v1 should include:

- local project metadata
- direct and transitive dependencies
- exact version installs first
- npm package metadata lookup
- tarball downloads from npm-hosted URLs
- handling real network and missing-package failures
- local package cache
- install layout on disk
- lockfile generation and reuse
- script execution for the current project

That also means v1 should exclude:

- publishing packages to a registry
- private registries and authentication
- supporting many registry protocols
- workspace graph coordination
- peer dependency negotiation
- advanced hoisting strategies
- multi-platform binary management
- signature verification and policy systems

These excluded areas are real, but they belong after the core loop is understandable.

## Saturn Focus
This chapter should produce a written product decision for `saturn`: one page or less that states the promises of v1. That statement becomes the guardrail for the rest of the project.

Your v1 promise should support the deployment milestone. If a feature does not help `saturn` manage a real Node app, it should be treated as optional unless it teaches a critical concept.

## Suggested Tasks
- Write down the minimum user story that v1 must satisfy.
- List the three most important commands you expect `saturn` to expose early.
- Decide what "successful install" means in observable terms.
- List advanced features you are explicitly postponing so you do not accidentally design around them.

## Common Mistakes
- Confusing "interesting" with "necessary."
- Adding frontend-specific concerns before the Node app milestone is complete.
- Treating deployment as a future concern rather than a forcing function for reproducibility.
- Letting npm's full ecosystem surface area expand the v1 scope.
- Expanding v1 to match a mature ecosystem tool.

## Checkpoint
You should have a stable definition of `saturn` v1 that would let another engineer understand the product boundary without reading your implementation.

## Reflection Prompts
- Why is it useful to exclude publishing from the first version?
- What feature feels tempting to include even though it does not help the core learning goal?
- How does the deployment milestone change your scope decisions?

## Preview
The next chapter moves from product scope into interface design by shaping the CLI and repository layout of `saturn`.
