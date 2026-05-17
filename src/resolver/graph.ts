
// design the resolver so the registry fetch function can be injected. 

import { loadManifest } from "../project/manifest";


type ResolvedGraph = {
    packages: Map<string, ResolvedPackage>
}

type ResolvedPackage = {
    name: string;
    version: string;
    dependencies: Map<string, string>;
}

// the whole task of this function is to take the manifest (getManifest) -> parse the dependencies. 
export async function resolveDependencyGraph(dependencies: Record<string, string>, fetchPackage: any): Promise<ResolvedGraph> {

    const



    const packages = new Map<string, ResolvedPackage>();

    return { packages };
}