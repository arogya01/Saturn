import { readFile, writeFile } from "fs/promises";
import { join } from "path";

export type SaturnManifest = {
    name: string;
    version?: string;
    dependencies: Record<string, string>;
    scripts?: Record<string, string>;
}


export async function loadManifest(projectDir: string): Promise<SaturnManifest> {
    try {
        const manifestPath = join(projectDir, 'saturn.json');
        const raw = await readFile(manifestPath, 'utf-8');
        const data = JSON.parse(raw);

        return parseManifest(data);
    }
    catch (error) {
        throw new Error(`Failed to load Saturn manifest in ${projectDir}`, { cause: error });

    }

}

function parseManifest(value: unknown): SaturnManifest {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        throw new Error("Saturn manifest must be an object");
    }

    const obj = value as Record<string, unknown>;

    if (typeof obj.name !== "string") {
        throw new Error("Saturn manifest must have a name property of type string");
    }

    if (obj.dependencies === undefined || obj.dependencies === null || typeof obj.dependencies !== "object" || Array.isArray(obj.dependencies)) {
        throw new Error("Saturn manifest must have a dependencies property of type object");
    }

    if (obj.scripts !== undefined) {
        if (obj.scripts === null || typeof obj.scripts !== "object" || Array.isArray(obj.scripts)) {
            throw new Error("Saturn manifest must have a scripts property of type object");
        }
    }

    const dependencies: Record<string, string> = {};

    for (const [key, value] of Object.entries(obj.dependencies)) {

        if (typeof key !== "string") {
            throw new Error(`Saturn manifest dependency "${key}" must be a string`);
        }

        const trimmedKey = key.trim();
        if (trimmedKey.length === 0) {
            throw new Error(`Saturn manifest dependency key must not be empty`);
        }

        if (typeof value !== "string") {
            throw new Error(`Saturn manifest dependency "${key} - ${value}" must be a string`);
        }

        const trimmedValue = value.trim();
        if (trimmedValue.length === 0) {
            throw new Error(`Saturn manifest dependency "${key}" must not be empty`);
        }

        if (!isValidSemVer(trimmedValue)) throw new Error(`Saturn manifest dependency "${key}" must have valid semver`)


        dependencies[trimmedKey] = trimmedValue;

    }

    const scripts: Record<string, string> = {};

    if (obj.scripts) {
        for (const [key, value] of Object.entries(obj.scripts)) {
            if (typeof value !== "string") {
                throw new Error(`Saturn manifest script "${key}" must be a string`);
            }

            if (typeof key !== "string") {
                throw new Error(`Saturn manifest script key must be a string`);
            }

            const trimmedKey = key.trim();
            if (trimmedKey.length === 0) {
                throw new Error(`Saturn manifest script key must not be empty`);
            }

            const trimmedValue = value.trim();
            if (trimmedValue.length === 0) {
                throw new Error(`Saturn manifest script "${key}" must not be empty`);
            }

            scripts[trimmedKey] = trimmedValue;
        }
    }

    let version: string | undefined;

    if (obj.version !== undefined) {
        if (typeof obj.version !== "string") {
            throw new Error("Saturn manifest version must be a string");
        }

        const v = obj.version.trim();

        if (v.length === 0) {
            throw new Error("Saturn manifest version must not be empty");
        }

        if (!/^[0-9]+\.[0-9]+\.[0-9]+(-[0-9a-zA-Z-.]+)?$/.test(v)) {
            throw new Error("Saturn manifest version must be a valid semantic version");
        }

        version = v;
    }

    let name: string = obj.name.trim();
    if (name.length === 0) {
        throw new Error("Saturn manifest name must not be empty");
    }

    return {
        name,
        dependencies,
        scripts,
        version
    }

}

export function createDefaultManifest(name: string): SaturnManifest {
    // default should be created as the same validation layer
    const defaultManifest = {
        name: name,
        dependencies: {},
        scripts: {}
    };

    const parsedManifest = parseManifest(defaultManifest);
    return parsedManifest;
}

export async function writeManifest(projectDir: string, manifest: SaturnManifest) {
    try {
        const filePath = join(projectDir, 'saturn.json');
        await writeFile(filePath, JSON.stringify(manifest, null, 2));
    } catch (error) {
        throw new Error(`Failed to write manifest: ${error}`);
    }

}

function isValidSemVer(value: string) {
    // 1.2.5 is what we want, not sure what the regex will be for this. 
    // We want the following: 
    // 0.0.0 is valid 
    // 1.0.0 is valid 


    // so the regex is: 
    return value.match(/^[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9\-.]+)?$/) !== null;
}