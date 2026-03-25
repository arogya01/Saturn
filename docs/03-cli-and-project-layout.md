# CLI And Project Layout

## Goal
Design the surface area of `saturn` before implementing its internals. By the end of this chapter, you should know how a user interacts with `saturn` and how the project should be organized.

## Why This Matters
A package manager is used through commands, files, and side effects on disk. If those entry points are fuzzy, the internal architecture usually becomes fuzzy too. The CLI is not just a wrapper; it is the expression of your tool's contract with the user.

## Concept Explanation
A small package manager does not need many commands, but each command must own a clear responsibility. For this course, the likely early command set is:

- initialize a project
- add a dependency
- install all dependencies
- run a project script

This is enough to drive the main learning path. More commands can come later if they are solving a real need rather than reflecting feature envy.

Project layout matters for the same reason. You will eventually need to separate:

- command handling
- manifest loading
- dependency resolution
- registry access
- archive fetching
- cache management
- installation logic
- script execution

Clear boundaries make debugging easier because package-manager bugs often hide at subsystem edges.

## Saturn Focus
Use this chapter to define:

- which commands `saturn` will expose in v1
- what files it expects in a project
- where it stores installed packages
- where it stores reusable cached artifacts

Also decide how you want to organize the `saturn` source tree so the resolver does not quietly mix with the installer or the fetcher.

## Suggested Tasks
- Write a short description of each intended CLI command.
- Draft the folders and modules you think `saturn` will need internally.
- Decide which command should create `saturn.json`.
- Decide where installed dependencies should live and why.
- Decide where the shared or project-local cache should live.

## Common Mistakes
- Letting one command do too much hidden work.
- Mixing user-facing files with internal cache data.
- Designing the folder structure around current convenience instead of subsystem boundaries.
- Treating script execution as unrelated to dependency management.

## Checkpoint
You should be able to describe the basic `saturn` command set and explain why the internal project layout mirrors the main responsibilities of a package manager.

## Reflection Prompts
- Why is `saturn run` part of the same tool instead of a separate helper?
- What should be project-local, and what could be shared across installs?
- Which subsystem boundaries feel most important to keep clean from the start?

## Preview
The next chapter turns to the first persistent project artifact: the manifest that tells `saturn` what a project wants.
