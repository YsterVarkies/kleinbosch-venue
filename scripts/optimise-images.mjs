// Turns the paintings in assets/ and the supplied venue photos/logo in Images/ into web-sized WebP
// files in public/img/, prints their dimensions for src/components/Img.jsx, and writes a contact sheet.
import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'node:fs';
import { join, parse } from 'node:path';

const out = 'public/img';
mkdirSync(out, { recursive: true });
mkdirSync('.taste-skill', { recursive: true });

const suppliedVenuePhotos = [
  { path: join('Images', 'logo-transparent.png'), name: 'logo' },
  { path: join('Images', 'unnamed.webp'), name: 'venue-chandeliers' },
  { path: join('Images', 'unnamed (1).webp'), name: 'venue-hall-lounge' },
  { path: join('Images', 'unnamed (2).webp'), name: 'venue-stone-wall-table' },
  { path: join('Images', 'unnamed (3).webp'), name: 'venue-ceremony-trees' },
  { path: join('Images', 'unnamed (4).webp'), name: 'venue-long-table-glass-doors' },
  { path: join('Images', 'unnamed (5).webp'), name: 'venue-platters' },
  { path: join('Images', 'unnamed (6).webp'), name: 'venue-hall-winter-trees' },
  { path: join('Images', 'unnamed (7).webp'), name: 'venue-dried-flowers' },
  { path: join('Images', 'unnamed (8).webp'), name: 'venue-window-view' },
  { path: join('Images', '754462863_1549241226894955_5062790597956458981_n.jpg'), name: 'venue-blue-table' },
  { path: join('Images', '754798366_1548726500279761_7286668826409352187_n.jpg'), name: 'venue-visit' }
];

const sources = [
  ...readdirSync('assets').filter((f) => f.endsWith('.jpg')).map((f) => ({ path: join('assets', f), name: parse(f).name })),
  ...suppliedVenuePhotos
];

for (const { path, name } of sources) {
  const { width, height } = await sharp(path).metadata();
  // Each size fits inside a square box and is never enlarged, so portraits are capped by their
  // height and small photographs keep their own size. Img.jsx works out the real widths the same way.
  for (const box of [800, 1600]) {
    await sharp(path)
      .resize({ width: box, height: box, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 72 })
      .toFile(join(out, `${name}-${box}.webp`));
  }
  console.log(`'${name}': [${width}, ${height}],`);
}

const thumbs = await Promise.all(sources.map((s) => sharp(s.path).resize(300, 300, { fit: 'cover' }).jpeg().toBuffer()));
const cols = 6;
await sharp({ create: { width: cols * 300, height: Math.ceil(sources.length / cols) * 300, channels: 3, background: '#222' } })
  .composite(thumbs.map((input, i) => ({ input, left: (i % cols) * 300, top: Math.floor(i / cols) * 300 })))
  .jpeg()
  .toFile('.taste-skill/contact-sheet.jpg');
