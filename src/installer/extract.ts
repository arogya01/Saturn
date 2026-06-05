import { rm } from "node:fs";
import { extract } from "tar";

export async function extractTarball(path: string) {
  rm(".saturn/node_modules");
  await extract({
    file: path,
    cwd: process.cwd(),
    strip: 1,
  });
}
