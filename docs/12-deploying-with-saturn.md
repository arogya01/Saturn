# Deploying With Saturn

## Goal
Turn local success into deployment confidence by defining how `saturn` should support a fresh environment that needs to install dependencies and run the app predictably.

## Why This Matters
Local development can hide accidental state. Deployment removes that safety net. A fresh machine or clean environment forces `saturn` to prove that its manifest, lockfile, fetching, caching, and script-running behaviors are sufficient on their own.

This chapter is the final proof that `saturn` works as a package manager rather than a one-time development experiment.

## Concept Explanation
A deployment-oriented install asks harsher questions than a local one:

- Can a clean environment reconstruct the same dependency tree?
- Does the lockfile carry enough information?
- Are failure messages clear when something is missing or inconsistent?
- Does the startup command work without developer-specific assumptions?
- Can the install distinguish registry or network failure from a local installation bug?

Deployment does not require a sophisticated platform for this course. It requires a clean, repeatable installation story. The important lesson is that package managers are infrastructure tools. Their correctness matters most when convenience disappears.

Because `saturn` uses the live npm registry, a clean deployment environment should assume registry access is required unless the needed artifacts are already cached. That makes it especially important to separate network assumptions from package-layout assumptions during debugging.

## Saturn Focus
This chapter should define and validate a simple deployment flow built around `saturn`:

- bring the project into a clean environment
- install according to manifest and lockfile rules
- run the startup script
- confirm the app behaves as expected

If something breaks only in clean environments, that is a valuable result. It usually points to hidden assumptions in path handling, install layout, or lockfile completeness.

## Suggested Tasks
- Define the exact steps of your clean-environment deployment test.
- Decide what files must travel with the project for deployment to succeed.
- Decide whether your deployment validation assumes live npm access, prewarmed cache, or both as separate scenarios.
- Verify that the install does not depend on undeclared local state.
- Write down the failure cases that would make you distrust `saturn` for deployment.

## Common Mistakes
- Testing deployment in an environment polluted by previous installs.
- Ignoring lockfile behavior because local installs already work.
- Assuming cache presence in an environment that should be treated as fresh.
- Misdiagnosing registry access failures as install-layout failures.
- Treating deployment problems as unrelated to package-manager design.

## Checkpoint
You should have a deployment story that demonstrates a clean environment can install dependencies and launch the Node app using `saturn`. This is Milestone 6.

## Reflection Prompts
- What did deployment reveal that local development did not?
- Which part of `saturn` became most important once the environment was clean?
- What is the minimum evidence you need to distinguish npm unavailability from a Saturn logic bug?
- What would make you confident enough to use `saturn` again on a different machine?

## Preview
The next chapter zooms out and explains the entire system end to end so you can connect individual chapters into one coherent mental model.
