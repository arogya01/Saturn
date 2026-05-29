import { ensureTarballCached } from "../cache/store";
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

  for (const [packageKey, packageMetadata] of graph.packages) {
    console.log(`Caching ${packageKey}`);

    await ensureTarballCached({
      ...packageMetadata,
      projectDir,
    });
  }
  console.log(`Cached ${graph.packages.size} packages`);
}
