# Registry And Package Metadata

## Goal
Understand what a registry is, what information it must provide, and why a mock registry is the right learning tool for `saturn`.

## Why This Matters
Most package managers feel intimidating because they appear to depend on a huge remote ecosystem from the first step. For learning, that is unnecessary noise. The critical concept is not "talk to the real internet immediately." The critical concept is "understand what metadata must exist for resolution and download to work."

A mock registry gives you control. It reduces variables while still teaching the real abstraction.

## Concept Explanation
A registry is a source of truth about packages and versions. At minimum, `saturn` needs metadata that lets it answer:

- does this package exist?
- which versions are available?
- where is the archive for a given version?
- what dependencies does that version declare?
- what integrity information should be checked after download?

This means registry data is not just a filename list. It is versioned package metadata that drives both resolution and retrieval.

By starting with a mock registry, you can design and test the contract cleanly:

- package name lookup
- version metadata lookup
- archive location
- dependency metadata per version
- integrity or checksum data

Once that contract feels stable, a real registry becomes an implementation detail rather than a conceptual leap.

## Saturn Focus
This chapter should produce your registry contract. Decide what shape of metadata `saturn` expects and how the fetcher will locate artifacts from that metadata.

Do not optimize for real-world registry compatibility yet. Optimize for clarity:

- readable metadata
- obvious version relationships
- easy-to-debug archive references
- enough information to support later lockfile generation

## Suggested Tasks
- Define what information a package version record must contain.
- Decide how the mock registry will be organized so it is easy to inspect.
- Write down what should happen when a package is missing or a version is unavailable.
- Decide whether integrity information belongs in registry metadata, the lockfile, or both.

## Common Mistakes
- Thinking of the registry as only a storage bucket.
- Leaving dependency metadata out of version records.
- Designing the mock registry so loosely that resolution logic becomes unclear.
- Jumping to real registry APIs before your own data contract is stable.

## Checkpoint
You should be able to describe the minimum metadata a registry must provide for `saturn` to resolve, fetch, and later verify packages.

## Reflection Prompts
- Why is a mock registry not a shortcut, but a better teaching tool?
- What registry information belongs to package identity versus package version?
- If metadata is wrong but archives are present, which subsystem should detect the problem first?

## Preview
The next chapter uses that metadata to tackle one of the core problems in package management: deciding which exact versions to install.
