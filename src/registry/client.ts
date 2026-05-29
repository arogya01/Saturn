
export type PackageVersionMetaData = {
    name: string;
    version: string;
    dependencies?: Record<string, string>;
    tarballUrl: string;
    integrity?: string;
}

type NpmPackageVersionMetaData = {
    name: string;
    version: string;
    dependencies?: Record<string, string>;
    dist: {
        tarball: string;
        integrity?: string;
    }
}

type NpmPackageMetaData = {
    versions: Record<string, unknown>;
}

export async function fetchPackageVersionMetaData(name: string, version: string): Promise<PackageVersionMetaData> {
    try {
        const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(name)}/${version}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch package version metadata for ${name}@${version}`);
        }
        const data = await res.json();
        return transformNpmResponse(data)
    } catch (error) {
        if (error instanceof Error && error.message.includes('404')) {
            throw new Error(`Package not found: ${name}@${version}`);
        }
        throw error;
    }
}

export async function fetchPackageVersions(name: string): Promise<string[]> {
    const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(name)}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch package metadata for ${name}`);
    }

    const data = await res.json();
    if (!isPackageMetaDataValid(data)) {
        throw new Error(`Invalid package metadata for ${name}`);
    }

    return Object.keys(data.versions);
}


function isPkgMetaDataValid(data: unknown): data is NpmPackageVersionMetaData {
    if (typeof data !== 'object' || data === null) {
        return false;
    }

    if (!("name" in data) || typeof data.name !== "string") return false;
    if (!("version" in data) || typeof data.version !== "string") return false;

    if ("dependencies" in data) {
        if (typeof data.dependencies !== "object" || data.dependencies === null) return false;

        for (const [key, value] of Object.entries(data.dependencies)) {
            if (typeof value !== "string") return false;
        }
    }

    if (!("dist" in data) || typeof data.dist !== "object" || data.dist === null) return false;

    if (!("tarball" in data.dist) || typeof data.dist.tarball !== "string") return false;
    if (("integrity" in data.dist)) {
        if (typeof data.dist.integrity !== "string") return false;
    }

    return true;
}

function isPackageMetaDataValid(data: unknown): data is NpmPackageMetaData {
    if (typeof data !== "object" || data === null) {
        return false;
    }

    if (!("versions" in data) || typeof data.versions !== "object" || data.versions === null || Array.isArray(data.versions)) {
        return false;
    }

    return true;
}

function transformNpmResponse(data: unknown): PackageVersionMetaData {
    if (!isPkgMetaDataValid(data)) {
        throw new Error('Invalid package version metadata');
    }

    return {
        name: data.name,
        version: data.version,
        dependencies: data.dependencies ?? {},
        tarballUrl: data.dist.tarball,
        integrity: data.dist.integrity
    }
}

export async function downloadTarball(url: string): Promise<Buffer> {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to download tarball from ${url}`);
    }
    return Buffer.from(await res.arrayBuffer());
}
