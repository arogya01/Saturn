import { readFile } from "fs/promises";
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
        throw new Error(`Failed to load Saturn manifest in ${projectDir}`);
    }

}

export function parseManifest(value: unknown): SaturnManifest {
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
        if (obj.scripts !== null || typeof obj.scripts !== "object" || Array.isArray(obj.scripts)) {
            throw new Error("Saturn manifest must have a scripts property of type object");
        }
    }

    const dependencies: Record<string, string> = {};

    for (const [key, value] of Object.entries(obj.dependencies)) {
        if (typeof value !== "string") {
            throw new Error(`Saturn manifest dependency "${key}" must be a string`);
        }


        dependencies[key] = value;

    }

    const scripts: Record<string, string> = {};

    if (obj.scripts) {
        for (const [key, value] of Object.entries(obj.scripts)) {
            if (typeof value !== "string") {
                throw new Error(`Saturn manifest script "${key}" must be a string`);
            }

            scripts[key] = value;
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

    return {
        name: obj.name,
        dependencies,
        scripts,
        version
    }

}