import { PackageVersionMetaData } from "../registry/client";
import { maxSatisfying, valid } from "semver";


type ResolvedGraph = {
    packages: Map<string, PackageVersionMetaData>
}

type DependencyRequest = {
    name: string;
    versionSpec: string;
}

type PackageFetcher = (name: string, version: string) => Promise<PackageVersionMetaData>;
type PackageVersionsFetcher = (name: string) => Promise<string[]>;


export async function resolveDependencyGraph(
    dependencies: Record<string, string>,
    fetchPackage: PackageFetcher,
    fetchPackageVersions: PackageVersionsFetcher
): Promise<ResolvedGraph> {

    const queue = new Queue<DependencyRequest>();
    const packages = new Map<string, PackageVersionMetaData>();

    for (const [name, versionSpec] of Object.entries(dependencies)) {
        queue.enqueue({ name, versionSpec });
    }

    while (!queue.isEmpty()) {
        const top = queue.dequeue();
        if (!top) {
            continue;
        }

        const exactVersion = await resolveVersionSpec(top.name, top.versionSpec, fetchPackageVersions);
        const currPackageKey = createPackageKey(top.name, exactVersion);
        if (!packages.has(currPackageKey)) {
            const pkg = await fetchPackage(top.name, exactVersion);
            const childDeps = pkg.dependencies;

            if (childDeps) {
                for (const [name, versionSpec] of Object.entries(childDeps)) {
                    queue.enqueue({ name, versionSpec });
                }
            }

            packages.set(currPackageKey, pkg);


        }
    }

    return { packages };
}

async function resolveVersionSpec(
    name: string,
    versionSpec: string,
    fetchPackageVersions: PackageVersionsFetcher
): Promise<string> {
    const exactVersion = valid(versionSpec);
    if (exactVersion) {
        return exactVersion;
    }

    const availableVersions = await fetchPackageVersions(name);
    const resolvedVersion = maxSatisfying(availableVersions, versionSpec);

    if (!resolvedVersion) {
        throw new Error(`Unable to resolve ${name}@${versionSpec}`);
    }

    return resolvedVersion;
}

function createPackageKey(name: string, version: string): string {
    return `${name}@${version}`;
}


class Queue<T> {
    private items: T[];
    constructor() {
        this.items = [];
    }

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    front(): T | undefined {
        return this.items[0];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
};

