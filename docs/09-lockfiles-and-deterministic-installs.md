# Lockfiles And Deterministic Installs

## Goal
Design `saturn-lock.json` and understand why deterministic installs are essential once `saturn` is responsible for a real app.

## Why This Matters
A manifest expresses intent, but intent is not enough for reproducibility. If two developers or two deployment environments interpret the same manifest differently over time, the project becomes fragile. A lockfile is how a package manager records the exact dependency result that worked.

This chapter is where `saturn` becomes suitable for real deployment workflows.

## Concept Explanation
A lockfile captures the concrete output of resolution. It should preserve enough information that a later install can avoid re-solving the world and instead recreate the same dependency selection.

For `saturn`, that likely means recording:

- exact package versions
- archive source references
- dependency relationships
- integrity data
- possibly enough layout-relevant information to rebuild the install tree consistently

The lockfile is not just a cache artifact. It is part of the project's reproducible state. That means it should be stable, inspectable, and intentionally written.

## Saturn Focus
This chapter should force you to define the contract between the resolver, the fetcher, the installer, and the lockfile writer.

Ask:

- what exact facts must be preserved?
- what can be recomputed later?
- when should the lockfile be updated?
- what should happen if the manifest and lockfile disagree?

Your answers here directly affect whether `saturn` can support dependable rebuilds and deployment.

## Suggested Tasks
- List the fields the lockfile must contain for your v1 design.
- Decide whether installs should prefer the lockfile when present.
- Define mismatch behavior between `saturn.json` and `saturn-lock.json`.
- Decide how a user should tell whether the lockfile is stale.

## Common Mistakes
- Recording too little information and forcing expensive or ambiguous re-resolution.
- Treating the lockfile as purely temporary.
- Rewriting the lockfile in unstable ways that create noisy changes.
- Leaving manifest-lockfile mismatch behavior unspecified.

## Checkpoint
You should be able to explain how `saturn-lock.json` preserves the exact dependency state of a working project. This completes Milestone 3.

## Reflection Prompts
- Why is a lockfile essential for deployment, even if the manifest already names dependencies?
- Which details belong in the lockfile because they cannot be trusted to remain discoverable later?
- What should `saturn` do if the manifest changes but the lockfile does not?

## Preview
The next chapter expands `saturn` from installation into runtime support by teaching it how to run project scripts inside the dependency environment it created.
