import sharp from "sharp";
import { stat, readFile, writeFile } from "fs/promises";

const IMAGES = [
  "public/projects/lynk and go/lynk1.webp",
  "public/projects/jumbo car la caleta/jumbo26.webp",
  "public/projects/crown plaza/foto3.webp",
  "public/projects/PedidosYa/foto5.webp",
  "public/projects/bcdc/bcdc4.webp",
  "public/projects/aniomis/ani10.webp",
  "public/images/diseno-arquitectonico.png",
  "public/images/construccion.png",
  "public/images/bar-remodelacion.png",
];

const MAX_WIDTH = 1920;
const QUALITY = 72;

async function fileSize(p) {
  const s = await stat(p);
  return s.size;
}

async function compressOne(path) {
  const before = await fileSize(path);
  const buf = await readFile(path);
  const out = await sharp(buf)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toBuffer();
  await writeFile(path, out);
  const after = out.length;
  const pct = ((1 - after / before) * 100).toFixed(1);
  console.log(
    `${path}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB  (-${pct}%)`
  );
}

console.log(`Compressing ${IMAGES.length} images @ q${QUALITY}, max ${MAX_WIDTH}px wide`);
for (const f of IMAGES) {
  try {
    await compressOne(f);
  } catch (e) {
    console.error("FAIL", f, e.message);
  }
}
console.log("Done.");
