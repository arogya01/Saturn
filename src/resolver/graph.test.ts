import test from "node:test";
import assert from "node:assert/strict";
import { resolveDependencyGraph } from "./graph";
import { PackageVersionMetaData } from "../registry/client";


const registry = new Map<string, PackageVersionMetaData>([
    ["left-pad@1.0.0", {
        name: "left-pad",
        version: "1.0.0",
        dependencies: {},
        tarballUrl: "https://registry.npmjs.org/left-pad/-/left-pad-1.0.0.tgz",
    }],
    ["a@1.0.0", {
        name: "a",
        version: "1.0.0",
        dependencies: { b: "1.0.0" },
        tarballUrl: "https://registry.npmjs.org/a/-/a-1.0.0.tgz",
    }],
    ["b@1.0.0", {
        name: "b",
        version: "1.0.0",
        dependencies: {},
        tarballUrl: "https://registry.npmjs.org/b/-/b-1.0.0.tgz",
    }],
    ["dup-a@1.0.0", {
        name: "dup-a",
        version: "1.0.0",
        dependencies: { shared: "1.0.0" },
        tarballUrl: "https://registry.npmjs.org/dup-a/-/dup-a-1.0.0.tgz",
    }],
    ["dup-b@1.0.0", {
        name: "dup-b",
        version: "1.0.0",
        dependencies: { shared: "1.0.0" },
        tarballUrl: "https://registry.npmjs.org/dup-b/-/dup-b-1.0.0.tgz",
    }],
    ["shared@1.0.0", {
        name: "shared",
        version: "1.0.0",
        dependencies: {},
        tarballUrl: "https://registry.npmjs.org/shared/-/shared-1.0.0.tgz",
    }],
    ["old-lodash-parent@1.0.0", {
        name: "old-lodash-parent",
        version: "1.0.0",
        dependencies: { lodash: "3.10.1" },
        tarballUrl: "https://registry.npmjs.org/old-lodash-parent/-/old-lodash-parent-1.0.0.tgz",
    }],
    ["new-lodash-parent@1.0.0", {
        name: "new-lodash-parent",
        version: "1.0.0",
        dependencies: { lodash: "4.17.21" },
        tarballUrl: "https://registry.npmjs.org/new-lodash-parent/-/new-lodash-parent-1.0.0.tgz",
    }],
    ["lodash@3.10.1", {
        name: "lodash",
        version: "3.10.1",
        dependencies: {},
        tarballUrl: "https://registry.npmjs.org/lodash/-/lodash-3.10.1.tgz",
    }],
    ["lodash@4.17.21", {
        name: "lodash",
        version: "4.17.21",
        dependencies: {},
        tarballUrl: "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
    }],
    ["debug@4.4.3", {
        name: "debug",
        version: "4.4.3",
        dependencies: {},
        tarballUrl: "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
    }],
]);

const versions = new Map<string, string[]>([
    ["left-pad", ["1.0.0"]],
    ["a", ["1.0.0"]],
    ["b", ["1.0.0"]],
    ["dup-a", ["1.0.0"]],
    ["dup-b", ["1.0.0"]],
    ["shared", ["1.0.0"]],
    ["old-lodash-parent", ["1.0.0"]],
    ["new-lodash-parent", ["1.0.0"]],
    ["lodash", ["3.10.1", "4.17.21"]],
    ["debug", ["4.3.4", "4.4.3"]],
]);

const fetchPackage = async (name: string, version: string): Promise<PackageVersionMetaData> => {
    const pkg = registry.get(`${name}@${version}`);
    if (!pkg) {
        throw new Error(`Missing test package ${name}@${version}`);
    }
    return pkg;
};

const fetchVersions = async (name: string): Promise<string[]> => {
    return versions.get(name) ?? [];
};

test('Resolve one  direct dependency with no transitive dependencies.', async (testContext) => {
    const graph = await resolveDependencyGraph({
        'left-pad': '1.0.0'
    }, fetchPackage, fetchVersions);

    assert.equal(graph.packages.size, 1);
    assert.ok(graph.packages.has("left-pad@1.0.0"));
});

test("resolves one transitive dependency", async () => {
    const graph = await resolveDependencyGraph({
        a: "1.0.0"
    }, fetchPackage, fetchVersions);

    assert.equal(graph.packages.size, 2);
    assert.ok(graph.packages.has("a@1.0.0"));
    assert.ok(graph.packages.has("b@1.0.0"));
});

test("dedupes the same transitive dependency", async () => {
    const graph = await resolveDependencyGraph({
        "dup-a": "1.0.0",
        "dup-b": "1.0.0"
    }, fetchPackage, fetchVersions);

    assert.equal(graph.packages.size, 3);
    assert.ok(graph.packages.has("shared@1.0.0"));
});

test("allows the same package at multiple exact versions", async () => {
    const graph = await resolveDependencyGraph({
        "old-lodash-parent": "1.0.0",
        "new-lodash-parent": "1.0.0"
    }, fetchPackage, fetchVersions);

    assert.ok(graph.packages.has("lodash@3.10.1"));
    assert.ok(graph.packages.has("lodash@4.17.21"));
});

test("resolves a range to the highest matching version", async () => {
    const graph = await resolveDependencyGraph({
        debug: "^4.3.4"
    }, fetchPackage, fetchVersions);

    assert.equal(graph.packages.size, 1);
    assert.ok(graph.packages.has("debug@4.4.3"));
});
