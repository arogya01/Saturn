import { PackageVersionMetaData } from "../registry/client";


type ResolvedGraph = {
    packages: Map<string, PackageVersionMetaData>
}

type DependencyRequest = {
    name: string;
    version: string;
}

type PackageFetcher = (name: string, version: string) => Promise<PackageVersionMetaData>;

// the whole task of this function is to take the manifest (getManifest) -> parse the dependencies. 
export async function resolveDependencyGraph(dependencies: Record<string, string>, fetchPackage: PackageFetcher): Promise<ResolvedGraph> {

    const queue = new Queue<DependencyRequest>();
    const packages = new Map<string, PackageVersionMetaData>();

    for (const [name, version] of Object.entries(dependencies)) {
        queue.enqueue({ name, version });
    }

    while (!queue.isEmpty()) {
        const top = queue.dequeue();
        if (!top) {
            continue;
        }

        const currPackageKey = `${top.name}@${top.version}`;
        if (!packages.has(currPackageKey)) {
            const { name, version } = top;
            const pkg = await fetchPackage(name, version);
            const childDeps = pkg.dependencies;

            if (childDeps) {
                for (const [name, version] of Object.entries(childDeps)) {
                    const child = { name, version };
                    const childKey = `${name}@${version}`
                    if (!packages.has(childKey)) {
                        queue.enqueue(child);
                    }
                }
            }

            packages.set(currPackageKey, pkg);


        }
    }

    return { packages };
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


