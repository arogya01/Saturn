# Saturn Roadmap

## Goal
This course is a guided build of `saturn`, a small package manager that you will design and implement yourself. The target is not to imitate every feature of mature tools. The target is to understand the core machinery well enough that you can explain it, build it, and trust it for a real application.

By the end of the module, `saturn` should be able to manage dependencies for a Node web app, run project scripts, and support a deployable workflow. A later extension shows how the same ideas carry into a frontend application without turning the whole course into a bundling tutorial.

## Why This Matters
Package managers sit at the intersection of several important systems ideas:

- project metadata
- dependency graphs
- version selection
- network retrieval
- local caching
- filesystem layout
- deterministic builds
- runtime command execution

If you understand how these pieces fit together, tools like npm, pnpm, yarn, pip, cargo, or bundler become easier to reason about. More importantly, you stop treating them like magic.

## Course Philosophy
This course is mentor-led, not solution-led. Each chapter explains a concept, narrows the design problem, and suggests concrete work for you to do. The module should help you think clearly, debug deliberately, and connect your implementation choices to real package-manager behavior.

You should expect to build gradually. Some chapters will feel conceptual. Others will feel mechanical. That is normal. Package managers are not powered by one clever trick; they are built by composing many small, disciplined decisions.

## What Saturn Will Support In V1
- a project manifest stored in `saturn.json`
- direct dependency declarations
- a lockfile stored in `saturn-lock.json`
- package resolution from the npm registry
- downloading and caching package archives
- unpacking and installing dependencies locally
- running project scripts through `saturn run`
- enough reliability to support a real Node web app

## What Saturn Will Not Support In V1
- publishing packages
- private registries and authentication
- alternate registry protocols
- workspaces or monorepos
- peer dependency rules
- native compilation workflows
- advanced conflict resolution strategies
- production-grade performance tuning

These are not unimportant. They are intentionally deferred so the core path stays understandable.

## Milestones
- Milestone 1: `saturn` understands project metadata.
- Milestone 2: `saturn` can resolve and fetch packages from the npm registry.
- Milestone 3: `saturn` can install dependency trees and record deterministic state.
- Milestone 4: `saturn` can run project scripts.
- Milestone 5: `saturn` can support a real Node web app locally.
- Milestone 6: a Node web app is deployed using dependencies managed by `saturn`.
- Extension milestone: a frontend SPA works well enough to show where package management ends and bundling begins.

## How To Use This Course
Treat each chapter as a focused design and implementation session.

- Read the explanation first.
- Write down your own design decisions before you build.
- Implement only what the chapter is targeting.
- Verify the checkpoint before moving on.
- Keep notes on what felt obvious, what felt fragile, and what you still cannot explain clearly.

If a chapter exposes confusion, stop and resolve it there. Package-manager complexity compounds quickly when gaps are carried forward.

Because this course uses the live npm registry, expect real network behavior to be part of the lesson. Caching, retries, and failure handling are part of the core learning path rather than optional polish.

## Suggested Rhythm
- one reading pass to understand the concept
- one design pass to make your own decisions
- one implementation pass to build the chapter outcome
- one reflection pass to explain what you built in plain language

## Checkpoint
You should now know what the course is trying to build, why the scope is intentionally narrow, and what counts as success for `saturn`.

## Reflection Prompts
- Why is a package manager more than a downloader?
- Why is a deployable app a better milestone than a toy installer?
- Which features are intentionally excluded from v1, and why is that a strength?

## Preview
The next chapter defines the job of a package manager in concrete terms so you can separate the essential responsibilities from ecosystem-specific details.
