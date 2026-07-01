import { mkdir } from "node:fs/promises";
import { extract } from "tar";

export async function extractTarball(tarballPath: string, targetDir: string) {
  await mkdir(targetDir, { recursive: true });
  await extract({
    file: tarballPath,
    cwd: targetDir,
    strip: 1,
  });
}
