# What Real Package Managers Do Next

## Goal
Place `saturn` in context by understanding the major problems that mature package managers solve beyond this course.

## Why This Matters
Finishing a learning project can create the false impression that the hard part is over. In reality, a package manager becomes dramatically more complex as soon as it has to support many users, many project shapes, many environments, and strong backward compatibility expectations.

This chapter should leave you with respect for that complexity without making your own project feel incomplete.

## Concept Explanation
By this point, `saturn` should support the core loop well:

- read a manifest
- resolve dependencies
- fetch and verify artifacts
- install them predictably
- write a lockfile
- run project scripts
- support a real deployment path

That is a meaningful accomplishment. Mature tools go further because ecosystems demand it. Some of the major next problems include:

- peer dependency coordination
- workspace and monorepo graphs
- package publishing workflows
- authentication and private registries
- content-addressed global stores at scale
- platform-specific binaries and native compilation
- signature verification and policy enforcement
- compatibility with legacy install layouts
- performance at very large dependency counts
- long-term format stability for manifests and lockfiles

Each of these areas introduces new design pressure. Many also create tradeoffs where no single answer is best for all users.

## Saturn Focus
Use this chapter to assess what `saturn` proved and what it intentionally did not attempt.

The correct outcome is not "now add everything." The correct outcome is:

- understand the next classes of problems
- know which subsystem each problem affects
- appreciate why mature package managers make the tradeoffs they do

## Suggested Tasks
- List the three most interesting post-v1 problems to you and explain why.
- Map each deferred feature to the subsystem it would complicate.
- Decide which one extension you would pursue next if `saturn` became a longer-term project.
- Write a short retrospective on what this project taught you about tool design.

## Common Mistakes
- Treating deferred features as evidence that the project was too small.
- Assuming advanced package-manager behavior is just more code rather than more design pressure.
- Expanding into multiple new problem areas at once without a fresh scope decision.
- Forgetting how much of `saturn` already had to coordinate correctly to reach deployment.

## Checkpoint
You should be able to explain both what `saturn` accomplishes and why production-grade package managers need additional machinery beyond this module.

## Reflection Prompts
- Which deferred feature seems most conceptually different from the core path you built?
- Which subsystem of `saturn` would become most complex if you pursued the next level?
- What part of the project changed how you think about developer tooling?

## Preview
There is no next chapter. The next step is to use `saturn`, document what you learned, and decide whether you want to deepen one subsystem or keep the project as a focused learning artifact.
