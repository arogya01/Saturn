# Fetching, Caching, And Integrity

## Goal
Understand how `saturn` should retrieve package archives, reuse them efficiently, and verify that what was fetched matches what was expected. This chapter completes the path to Milestone 2.

## Why This Matters
A package manager that resolves correctly but fetches carelessly is still unreliable. Real projects are installed repeatedly. Teams rebuild environments. deployment systems start from scratch. If `saturn` redownloads everything every time, cannot verify artifacts, or handles network failures badly, it will not scale beyond a demo.

Caching and integrity checks are not advanced polish. They are part of making installs trustworthy.

## Concept Explanation
After resolution, `saturn` knows which package versions it needs. The next job is to retrieve those packages from archive locations and store them in a reusable way.

This introduces three concerns:

- fetching: obtaining the archive from the registry location
- caching: storing a reusable local copy so the next install is cheaper
- integrity: confirming the archive matches expected metadata

Using the live npm registry adds a fourth practical concern: network variability. Timeouts, missing tarballs, slow responses, and interrupted downloads are part of the real environment `saturn` is being built for.

A cache is not just a performance trick. It changes how the tool behaves under repeated installs, partial failures, and deployment workflows. Similarly, integrity is not just a security checkbox. It is a guardrail against corrupted or mismatched artifacts.

## Saturn Focus
Your design should answer:

- when should `saturn` hit the registry versus reuse the local cache?
- how should cache entries be identified?
- when should integrity be checked?
- what should happen if a cached artifact fails verification?
- what should happen when npm metadata is available but the tarball fetch fails?

The simplest useful policy is usually:

- resolve first
- inspect cache
- fetch only what is missing
- verify every artifact before trusting it

## Suggested Tasks
- Define the lifecycle of one archive from registry reference to local cache.
- Decide whether cache identity should be version-based, content-based, or both.
- Decide what errors should be surfaced when a fetch fails, npm is unavailable, or an integrity check fails.
- Decide whether retry behavior belongs in the first version of the fetcher and how visible it should be.
- Write down how repeated installs should behave when nothing changed.

## Common Mistakes
- Treating cache reuse as optional.
- Trusting archive contents without verification.
- Combining extraction with fetching so cached artifacts cannot be reused cleanly.
- Treating live-registry failures as edge cases instead of core install behavior.
- Leaving failure behavior undefined when cached state is inconsistent.

## Checkpoint
You should now be able to describe how `saturn` fetches packages, reuses local artifacts, and verifies correctness before installation. This completes Milestone 2.

## Reflection Prompts
- Why is artifact integrity a correctness concern even in a small learning project?
- What should `saturn` do if the cache contains an artifact with the right name but the wrong content?
- How should `saturn` help a user distinguish between a network failure and a bad local cache entry?
- How does caching support the eventual deployment story?

## Preview
The next chapter turns archive files into an install layout that a real project can actually use.
