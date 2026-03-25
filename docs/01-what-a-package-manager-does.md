# What A Package Manager Does

## Goal
Understand the core responsibilities of a package manager before you design `saturn`. By the end of this chapter, you should be able to describe the full lifecycle of dependency management in plain language.

## Why This Matters
Students often start building tools too early and only later discover they were solving the wrong problem. A package manager is not just a command that downloads files. It is a coordinator that translates project intent into a repeatable local environment.

If you can name the responsibilities clearly, you can assign them cleanly in your design.

## Concept Explanation
A package manager typically answers five questions:

- What does this project say it needs?
- Which exact package versions should satisfy those requirements?
- Where do those package contents come from?
- How should those contents be placed on disk so the app can use them?
- How do we make the result repeatable later?

Those questions map to recognizable subsystems.

- The manifest expresses intent.
- The resolver turns intent into exact choices.
- The registry client and fetcher retrieve artifacts.
- The installer lays files out locally.
- The lockfile preserves a deterministic result.
- The script runner helps the project execute commands in the installed environment.

Different ecosystems make different tradeoffs, but these responsibilities keep showing up.

## Saturn Focus
Your job in this chapter is not to implement anything yet. Your job is to define the boundaries of the system you are about to build.

For `saturn`, the first useful mental model is this:

- `saturn` reads a project declaration.
- `saturn` decides which exact packages are needed.
- `saturn` gets those packages from a registry.
- `saturn` installs them in a layout the project can use.
- `saturn` records enough information to repeat the result.

## Suggested Tasks
- Write a one-sentence description of each subsystem in your own words.
- Sketch the lifecycle of `saturn install` from user command to finished dependency tree.
- Identify which parts require filesystem work, which require network work, and which are mostly graph logic.
- Decide what you think should happen when the same install is run twice.

## Common Mistakes
- Treating resolution and installation as the same step.
- Thinking the lockfile is optional for a tool meant to support deployment.
- Ignoring the runtime environment and focusing only on download mechanics.
- Designing around every advanced feature before basic installs work.

## Checkpoint
You should be able to explain the difference between a manifest, a resolver, a registry, an installer, and a lockfile without referring to a specific package ecosystem.

## Reflection Prompts
- Why is version resolution a separate concern from archive download?
- Why does deployment pressure make deterministic installs more important?
- Which subsystem seems most straightforward, and which seems easiest to get subtly wrong?

## Preview
The next chapter narrows the problem further by deciding what `saturn` should and should not attempt in its first version.
