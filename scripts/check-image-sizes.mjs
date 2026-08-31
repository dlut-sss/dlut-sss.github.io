import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const MAX_IMAGE_BYTES = 500_000;
const IMAGE_EXTENSIONS = new Set([
  ".avif",
  ".bmp",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".tif",
  ".tiff",
  ".webp",
]);

async function* walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      yield* walk(filePath);
    } else if (entry.isFile()) {
      yield filePath;
    }
  }
}

const oversizedImages = [];

for (const root of ["public", "src"]) {
  for await (const filePath of walk(root)) {
    if (!IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase())) continue;

    const { size } = await stat(filePath);
    if (size > MAX_IMAGE_BYTES) oversizedImages.push({ filePath, size });
  }
}

if (oversizedImages.length > 0) {
  console.error("Images must be no larger than 500,000 bytes:");
  for (const { filePath, size } of oversizedImages) {
    console.error(`- ${filePath} (${size.toLocaleString("en-US")} bytes)`);
  }
  process.exitCode = 1;
} else {
  console.log("Image size check passed (limit: 500,000 bytes).");
}
