// One of the paintings or photographs in public/img, served as WebP at two sizes.
// Sizes of the originals, as `npm run images` prints them.
const SIZES = {
  'automne-peupliers-eragny-autumn-poplars-eragny': [1920, 2588],
  'avenue-of-pollard-birches-and-poplars': [1920, 1392],
  logo: [1037, 1037],
  'poplars-at-giverny-sunrise': [1920, 1514],
  'poplars-in-the-sun': [1920, 2447],
  'poplars-on-the-epte': [1920, 1920],
  'venue-blue-table': [1440, 1080],
  'venue-ceremony-trees': [382, 510],
  'venue-chandeliers': [680, 510],
  'venue-dried-flowers': [680, 453],
  'venue-green-napkins': [680, 453],
  'venue-hall-lounge': [680, 453],
  'venue-hall-winter-trees': [680, 453],
  'venue-long-table-glass-doors': [680, 453],
  'venue-platters': [382, 510],
  'venue-stone-wall-table': [680, 453],
  'venue-window-view': [340, 510],
  'venue-visit': [1440, 1080]
};

export default function Img({ name, alt, sizes = '100vw', eager = false, className = '', style }) {
  const [width, height] = SIZES[name];
  const base = `${import.meta.env.BASE_URL}img/${name}`;
  // Files fit a square box and are never enlarged (scripts/optimise-images.mjs), so a portrait is
  // narrower than its box and a small photograph keeps its own width.
  const w = (box) => Math.min(width, Math.round(box * Math.min(1, width / height)));
  return (
    <img
      className={className}
      style={style}
      src={`${base}-1600.webp`}
      srcSet={`${base}-800.webp ${w(800)}w, ${base}-1600.webp ${w(1600)}w`}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
