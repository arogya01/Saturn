# Install Layout And Linking

## Goal
Learn how `saturn` should transform cached package contents into a usable local dependency tree for a project.

## Why This Matters
Fetching archives is not enough. Applications need dependencies in a layout that their runtime and tools can discover. This is the point where package management becomes visibly concrete: files appear on disk, and the project starts depending on the exact installation strategy you chose.

## Concept Explanation
Installation usually involves several steps:

- unpacking an archive
- placing package contents in a local store or install location
- linking or copying them into a project-visible dependency tree
- preserving enough structure that transitive dependencies can also be found

Different package managers choose different layouts because they optimize for different goals: speed, disk efficiency, deduplication, compatibility, or simplicity. For a learning project, the best choice is the one you can explain and debug clearly.

The important conceptual question is not "which layout is most advanced?" It is "what layout makes dependency lookup work predictably for the project I am supporting?"

## Saturn Focus
Use this chapter to define:

- where installed packages live relative to the project
- whether `saturn` copies, links, or otherwise references cached contents
- how transitive dependencies are represented
- how a fresh install differs from an incremental reinstall

Aim for a layout that is easy to inspect manually. If a learner cannot look at the install tree and explain it, the design is probably too clever for this stage.

## Suggested Tasks
- Sketch the directory structure you expect after a successful install.
- Decide how `saturn` should treat already-installed packages during reinstall.
- Decide whether package contents should be copied into place or linked from a shared store.
- Define what "install complete" means from the project's perspective.

## Common Mistakes
- Choosing a layout for novelty instead of clarity.
- Forgetting that transitive dependencies also need a discoverable path.
- Mixing cache state with project-visible install state.
- Making reinstall behavior ambiguous.

## Checkpoint
You should be able to explain how `saturn` turns a resolved graph and cached archives into a dependency tree that a project can actually use.

## Reflection Prompts
- Why is install layout a compatibility decision, not just a storage decision?
- What tradeoff do you make when copying files versus linking them?
- How will you inspect whether an install tree is correct when debugging?

## Preview
The next chapter captures the result of resolution and installation in a lockfile so the same project can be rebuilt deterministically.
