# Versioning And Dependency Resolution

## Goal
Learn how `saturn` should turn declared dependency intent into exact package versions. This is the conceptual center of a package manager.

## Why This Matters
Downloading a file is easy. Deciding which file should be downloaded is where package managers become interesting. Resolution is where the tool moves from data retrieval into graph reasoning.

If this part is vague, the rest of the system becomes hard to trust.

## Concept Explanation
A project manifest usually describes dependencies in a human-friendly way. A package manager must translate those declarations into exact version selections. That translation has to consider:

- the project's direct dependencies
- the transitive dependencies declared by each package version
- conflicts between requested ranges
- the need for a deterministic final result

For learning, start with exact versions first. Exact versions let you focus on graph traversal, dependency expansion, and error handling without mixing in semver policy too early.

Once exact versions work, you can introduce ranges as a second layer. That keeps the core question stable: how does `saturn` build a complete dependency graph from a small set of top-level requirements?

## Saturn Focus
Your resolver should produce a clear output:

- the exact version chosen for each dependency
- the dependency relationships between packages
- enough structure for the installer and lockfile writer to consume later

Treat this as a pure reasoning phase. The resolver should decide what needs to exist before any fetching or unpacking begins.

## Suggested Tasks
- Define the input and output of the resolver in plain language.
- Decide how to represent a dependency graph so you can inspect it during debugging.
- Decide how the resolver should respond to missing packages, missing versions, and cycles.
- Implement exact-version support first in your design.
- Write down how range support would extend the resolver later without changing its core responsibility.

## Common Mistakes
- Mixing network fetch logic into the resolver.
- Trying to solve full semver behavior before graph basics are solid.
- Forgetting that transitive dependencies change the shape of the install plan.
- Producing resolver output that is too vague for later stages to use.

## Checkpoint
You should be able to explain, step by step, how `saturn` will move from direct dependency declarations to a complete set of exact package versions.

## Reflection Prompts
- Why is exact-version support the right starting point for learning?
- What information should the resolver output that the installer cannot rediscover reliably on its own?
- Where should cycle detection belong, and why?

## Preview
The next chapter moves from deciding what is needed to retrieving and storing the package contents safely and efficiently.
