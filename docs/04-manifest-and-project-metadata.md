# Manifest And Project Metadata

## Goal
Design the project manifest for `saturn` and understand why package managers need a stable, readable declaration of intent. This chapter marks the first major milestone: `saturn` understands project metadata.

## Why This Matters
Without a manifest, dependency management becomes guesswork. The package manager needs one authoritative source of truth about what the project is, what it depends on, and what runnable scripts it exposes.

The manifest is where human intent enters the system. Everything after this point is translation.

## Concept Explanation
A manifest should answer a few direct questions:

- What is this project called?
- What dependencies does it claim to need?
- Which commands should be runnable in the context of the project?
- What metadata does the package manager need to interpret the project consistently?

The goal is not to store every possible project detail. The goal is to store the details needed to make dependency management and project execution coherent.

For `saturn`, a minimal manifest design likely includes:

- package or project identity
- direct dependencies
- script definitions
- possibly a version or metadata section if you want future expansion

Keep it intentionally small. Overloaded manifests become hard to reason about.

## Saturn Focus
This chapter should help you decide the shape and meaning of `saturn.json`.

You want the manifest to be:

- easy for a human to edit
- stable for a program to parse
- specific enough that `saturn` can act predictably
- small enough that every field has a clear reason to exist

If you are unsure whether a field belongs, ask whether it directly supports install, run, or deterministic project behavior.

## Suggested Tasks
- Define the required and optional fields in `saturn.json`.
- Decide how direct dependencies should be represented.
- Decide how scripts should be represented.
- Write down validation rules for malformed or incomplete manifests.
- Decide what `saturn init` should create by default.

## Common Mistakes
- Treating the manifest as a dumping ground for future ideas.
- Forgetting that scripts are part of how developers experience a package manager.
- Allowing ambiguous dependency declarations that will complicate later resolution.
- Skipping validation and assuming the manifest will always be well-formed.

## Checkpoint
You should now have a clear manifest design and be able to explain how `saturn` reads project intent from it. This is Milestone 1.

## Reflection Prompts
- Which manifest fields are essential, and which are merely convenient?
- What validation errors should feel friendly versus strict?
- Why is it useful to separate declared dependency intent from the exact installed result?

## Preview
The next chapter introduces the external world that satisfies those dependency requests: the registry and its package metadata.
