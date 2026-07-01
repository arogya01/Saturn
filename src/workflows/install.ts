import { rmSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { ensureTarballCached } from "../cache/store";
import { extractTarball } from "../installer/extract";
import { loadManifest } from "../project/manifest";
import {
  fetchPackageVersionMetaData,
  fetchPackageVersions,
} from "../registry/client";
import { resolveDependencyGraph } from "../resolver/graph";

export async function runInstallWorkflow() {
  const projectDir = process.cwd();
  const manifest = await loadManifest(projectDir);
  const dependencyNames = Object.keys(manifest.dependencies);
  console.log(`Found ${dependencyNames.length} direct dependencies`);

  const graph = await resolveDependencyGraph(
    manifest.dependencies,
    fetchPackageVersionMetaData,
    fetchPackageVersions,
  );

  rmSync("node_modules", { recursive: true, force: true });
  await mkdir("./node_modules", { recursive: true });

  for (const [packageKey, packageMetadata] of graph.packages) {
    console.log(`Caching ${packageKey}`);

    const tarballPath = await ensureTarballCached({
      projectDir,
      name: packageMetadata.name,
      version: packageMetadata.version,
      tarballUrl: packageMetadata.tarballUrl,
      expectedIntegrity: packageMetadata.integrity,
    });

    // extract the tarball
    await extractTarball(
      tarballPath,
      `${projectDir}/node_modules/${packageMetadata.name}`,
    );
  }
  console.log(`Cached ${graph.packages.size} packages`);
}
