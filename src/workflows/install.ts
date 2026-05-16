import { loadManifest } from "../project/manifest";
import { fetchPackageVersionMetaData } from "../registry/client";

export async function runInstallWorkflow() {
    const projectDir = process.cwd();
    const manifest = await loadManifest(projectDir);
    const dependencyNames = Object.keys(manifest.dependencies);
    console.log(`Found ${dependencyNames.length} direct dependencies`);


}
