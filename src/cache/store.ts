import { join } from "path";
import { mkdir, access, writeFile, readFile } from "node:fs/promises";
import { downloadTarball } from "../registry/client";
import { createHash } from "node:crypto";

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
    console.log("Cache hit", tarballPath);
    const buffer = await readFile(tarballPath);

    if (!verifyIntegrity(buffer, expectedIntegrity)) {
      throw new Error("Integrity check failed");
    }

    return tarballPath;
  } catch (error) {
    console.log("Cache miss - fetching the tarball");
    await mkdir(targetDir, { recursive: true });
    const buffer = await downloadTarball(tarballUrl);

    if (!verifyIntegrity(buffer, expectedIntegrity)) {
      throw new Error("Integrity check failed");
    }

    await writeFile(tarballPath, buffer);
    return tarballPath;
  }
}

function verifyIntegrity(buffer: Buffer, expectedIntegrity?: string): boolean {
  if (!expectedIntegrity) return true;

  const actual = createHash("sha512").update(buffer).digest("base64");

  return actual === expectedIntegrity;
}
