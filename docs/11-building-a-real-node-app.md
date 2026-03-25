# Building A Real Node App

## Goal
Use `saturn` to support a real Node web app locally and confirm that the package manager can power more than a toy example. This chapter marks Milestone 5.

## Why This Matters
A package manager should eventually disappear into the background of actual application work. If `saturn` only works against hand-crafted demos, you have not yet proven that its design holds under realistic project behavior.

A real Node web app is the right next test because it exercises the exact things `saturn` claims to support:

- project manifest
- direct and transitive dependencies
- lockfile stability
- script execution
- repeatable local environment setup

## Concept Explanation
At this stage, the package manager is no longer the only subject. The application becomes a test of whether your package-manager abstractions were sound.

A good milestone app for this chapter should be modest in scope but real in behavior. It should:

- depend on at least one external package
- expose a start command
- be easy to verify locally
- be simple enough that app complexity does not hide package-manager problems

The point is not to impress with the app. The point is to prove that `saturn` supports a real developer workflow.

## Saturn Focus
This chapter should validate the full local loop:

- initialize or define the project manifest
- add dependencies through `saturn`
- install them deterministically
- run the app through `saturn run`
- confirm the app behaves as expected

When something fails, resist the urge to patch blindly. Identify which subsystem is responsible:

- manifest parsing
- resolution
- fetch or cache
- install layout
- script execution

## Suggested Tasks
- Choose a small Node web app with a clear start command.
- Verify that the app depends on packages that exercise transitive resolution.
- Define what local success looks like before you start debugging.
- Record any gaps where `saturn` still feels too fragile for repeated use.

## Common Mistakes
- Choosing an app so complex that debugging stops teaching package-manager concepts.
- Assuming that a successful install implies a runnable application.
- Fixing symptoms without identifying the subsystem boundary that failed.
- Changing too many parts of `saturn` at once when the first real app exposes issues.

## Checkpoint
You should have a locally working Node web app whose dependencies and scripts are managed by `saturn`. This is Milestone 5.

## Reflection Prompts
- Which part of `saturn` felt strongest when supporting a real app?
- Which hidden assumptions did the real app expose?
- What did the app prove about your install and script execution design?

## Preview
The next chapter takes the final step: using `saturn` in a deployment-oriented workflow where determinism and failure clarity matter even more.
