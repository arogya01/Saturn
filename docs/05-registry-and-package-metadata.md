# Registry And Package Metadata

## Goal
Understand how the npm registry models packages and versions, and how `saturn` should turn npm metadata into its own internal view of the world.

## Why This Matters
Using the real npm registry makes the course more concrete. Instead of inventing a toy metadata model and replacing it later, you will learn how package managers adapt an external contract into an internal one they can reason about.

The teaching goal is still clarity. The difference is that the data source is real. That means `saturn` must learn how to read npm package metadata, select the relevant version entry, and carry forward the fields that matter for resolution, fetching, integrity, and lockfile generation.

## Concept Explanation
The npm registry is a source of truth about packages and versions. At minimum, `saturn` needs npm metadata that lets it answer:

- does this package exist?
- which versions are available?
- which tags point to useful versions?
- where is the archive for a given version?
- what dependencies does that version declare?
- what integrity information should be checked after download?

In practice, this means understanding a few important npm concepts:

- the package metadata document as the top-level response
- the `versions` map as the source of per-version data
- `dist-tags` as named pointers such as `latest`
- the tarball URL carried by a specific version record
- integrity or shasum data carried alongside the distribution metadata

This is still not an excuse to make `saturn` depend on npm's full internal shape everywhere. A good package manager introduces an adapter boundary. npm is the external contract. `saturn` should normalize what it needs into a smaller internal representation that later chapters can consume consistently.

That internal representation should preserve the fields that matter most:

- package name
- exact version
- dependency map
- tarball URL
- integrity data

## Saturn Focus
This chapter should produce your registry adapter contract. Decide what data `saturn` fetches from npm, what fields it keeps, and how it presents that data to the resolver and fetcher.

Optimize for clarity, not for full npm feature coverage:

- readable internal package records
- obvious version relationships
- easy-to-debug tarball references
- enough metadata to support resolution, integrity checks, and lockfile generation

## Suggested Tasks
- Define what information a package version record must contain.
- Decide what the npm-facing client fetches versus what the normalized internal record stores.
- Pick a small set of public npm packages to use in examples so your learning path stays stable.
- Write down what should happen when a package is missing or a version is unavailable.
- Decide whether integrity information belongs in registry metadata, the lockfile, or both.

## Common Mistakes
- Thinking of the registry as only a storage bucket.
- Leaving dependency metadata out of version records.
- Passing raw npm response shapes through the entire codebase.
- Trying to support every npm edge case before the basic adapter is understandable.

## Checkpoint
You should be able to describe the npm metadata fields `saturn` needs and explain how they are normalized into a smaller internal registry representation.

## Reflection Prompts
- Why is an adapter boundary useful even when you only support npm?
- What registry information belongs to package identity versus package version?
- If metadata is wrong but archives are present, which subsystem should detect the problem first?

## Preview
The next chapter uses that metadata to tackle one of the core problems in package management: deciding which exact versions to install.
