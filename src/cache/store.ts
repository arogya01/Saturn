import { join } from "path";
import { mkdir, access, writeFile } from "node:fs/promises";
import { downloadTarball } from "../registry/client";

export async function ensureTarballCached({
  projectDir,
  name,
  version,
  tarballUrl,
  expectedIntegrity,
}: {
  projectDir: string;
  name: string;
  version: string;
  tarballUrl: string;
  expectedIntegrity?: string;
}): Promise<string> {
  const targetDir = join(projectDir, ".saturn", "cache", name);
  const tarballPath = join(targetDir, `${version}.tgz`);

  try {
    await access(tarballPath);
    return tarballPath;
  } catch (error) {
    await mkdir(targetDir, { recursive: true });
    const buffer = await downloadTarball(tarballUrl);

    await writeFile(tarballPath, buffer);
    return tarballPath;
  }
}
