# How The System Fits Together

## Goal
Build a complete mental model of `saturn` as one system rather than a list of chapters. By the end of this chapter, you should be able to narrate the full lifecycle of a package-manager command from start to finish.

## Why This Matters
Learning often happens in fragments. You understand manifests one week, lockfiles the next, deployment later. But the real value comes from understanding how each subsystem depends on the others. This chapter closes that gap.

## Concept Explanation
When a user runs a command such as an install, `saturn` moves through a chain of responsibilities:

- read project intent from the manifest
- interpret any existing lockfile state
- resolve the exact dependency graph
- obtain metadata and archives from the registry and cache
- verify artifacts before use
- build or refresh the install layout
- expose a usable environment to the project
- record the result so it can be repeated later

Each stage should hand clear information to the next stage. If one stage produces ambiguous output, later stages either become fragile or have to rediscover facts they should already know.

This is also where you should notice that package-manager design is fundamentally about coordination:

- state coordination between files
- dependency coordination across packages
- environment coordination across machines

## Saturn Focus
Use this chapter to write your own system narrative for `saturn`. If you can describe the lifecycle clearly, you probably understand the design. If you cannot, the weak spots in your explanation usually reveal the weak spots in the implementation.

Make sure you can explain:

- where the source of truth lives at each step
- what decisions are reversible versus fixed
- what state is derived versus persisted
- what assumptions are required for a successful run

## Suggested Tasks
- Write the lifecycle of `saturn install` in your own words from start to finish.
- Describe which artifacts are inputs, outputs, and reusable intermediates.
- Identify where the tool should fail fast versus continue gracefully.
- Explain how local development and deployment use the same core machinery differently.

## Common Mistakes
- Understanding each subsystem in isolation but not the handoff points.
- Forgetting which state comes from the manifest and which from the lockfile.
- Treating cache, install tree, and project metadata as interchangeable.
- Ignoring where clear errors matter most in the full flow.

## Checkpoint
You should be able to explain `saturn` end to end without relying on chapter notes, and you should know where each subsystem begins and ends.

## Reflection Prompts
- Which handoff between subsystems seems most fragile in your current design?
- What parts of the flow are derived from project intent, and what parts are historical state?
- If a user reports a broken install, where would you inspect first and why?

## Preview
The next chapter expands the lens to frontend projects and shows which problems belong to package management versus bundling and browser tooling.
