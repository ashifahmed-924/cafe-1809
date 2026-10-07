// Dev utility: builds a labelled contact sheet from a folder of images.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const dir = process.argv[2] || '_dl';
const out = process.argv[3] || 'contact.jpg';
const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|webp|png)$/i.test(f));
const cols = 8;
const cell = 220;
const rows = Math.ceil(files.length / cols);
const comps = [];
for (let i = 0; i < files.length; i++) {
  const buf = await sharp(path.join(dir, files[i])).resize(cell, cell, { fit: 'cover' }).toBuffer();
  const x = (i % cols) * cell;
  const y = Math.floor(i / cols) * cell;
  comps.push({ input: buf, left: x, top: y });
  const label = Buffer.from(
    `<svg width="${cell}" height="26"><rect width="100%" height="100%" fill="black" opacity=".7"/><text x="6" y="18" font-size="15" fill="white" font-family="Arial">${files[i].replace(/\.\w+$/, '')}</text></svg>`
  );
  comps.push({ input: label, left: x, top: y });
}
await sharp({ create: { width: cols * cell, height: rows * cell, channels: 3, background: '#222' } })
  .composite(comps)
  .jpeg({ quality: 80 })
  .toFile(out);
console.log('wrote', out);
