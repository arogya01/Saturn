# Running Scripts With Saturn

## Goal
Understand why package managers often double as script runners and define how `saturn run` should behave.

## Why This Matters
A real project is not useful just because dependencies are installed. Developers need to run the project. Build tasks, test tasks, and startup commands usually assume those dependencies are available in a predictable environment.

If `saturn` can install packages but cannot help launch the project cleanly, it is still incomplete as a developer tool.

## Concept Explanation
Script running sits at the boundary between package management and process execution. The package manager is responsible for giving scripts access to the environment it constructed. That usually means:

- reading named scripts from the manifest
- preparing the right working directory and path context
- spawning the requested process
- surfacing exit status and errors clearly

This is conceptually important because it closes the loop:

- manifest declares scripts
- install prepares dependencies
- script execution proves the environment actually works

Without this step, installation success can be misleading.

## Saturn Focus
This chapter should define:

- how scripts are declared in `saturn.json`
- what `saturn run <name>` means
- which environment assumptions `saturn` should prepare before launching the script
- how failures should be reported back to the user

Keep the interface small. The goal is to make project commands runnable, not to build a complete task orchestration framework.

## Suggested Tasks
- Decide how scripts are stored and validated in the manifest.
- Define the execution environment `saturn run` should create.
- Decide how missing scripts should be reported.
- Write down what information from the child process should be visible to the user.

## Common Mistakes
- Treating script execution as unrelated to dependency management.
- Hiding too much process failure detail from the user.
- Leaving script lookup rules ambiguous.
- Expanding into a general build system instead of a package-manager-supported runner.

## Checkpoint
You should be able to explain how `saturn run` uses manifest metadata and installed dependencies to launch project commands consistently. This completes Milestone 4.

## Reflection Prompts
- Why is script execution part of the package-manager experience in many ecosystems?
- What environment details must `saturn` control for scripts to behave predictably?
- How should `saturn` distinguish between script lookup errors and script runtime failures?

## Preview
The next chapter uses everything built so far to support a real Node web app locally, which is the point where `saturn` stops being a conceptual exercise.
