import Img from './Img.jsx';

const panels = [
  {
    img: 'venue-hall-lounge',
    label: 'The hall',
    alt: 'The Kleinbosch hall set with a long table, flowers and woven chairs beside the windows'
  },
  {
    img: 'venue-ceremony-trees',
    label: 'A ceremony under the trees',
    alt: 'Wicker chairs either side of an aisle leading to a wooden lectern under the trees'
  },
  {
    img: 'venue-long-table-glass-doors',
    label: 'Long tables by the glass doors',
    alt: 'A long wooden table with pink napkins, tall candles and greenery, beside glass doors onto bare trees'
  },
  {
    img: 'venue-chandeliers',
    label: 'Chandeliers after dark',
    alt: 'Long tables with white flowers and candles under lit chandeliers in the hall'
  }
];

// A band of unequal photographs; the one under the pointer widens.
export default function Venue() {
  return (
    <section className="chapter seasons" id="venue" data-ground="field-1" data-rise-group>
      <h2 className="seasons-heading" data-rise>Inside, and under the trees</h2>
      <div className="band" data-rise>
        {panels.map((p, i) => (
          <figure key={p.img} className="band-panel" tabIndex={0}>
            <Img name={p.img} alt={p.alt} sizes="(min-width: 900px) 42vw, 64vw" />
            {i === 0 && <span className="band-title">Kleinbosch, set for a party</span>}
            <figcaption className="band-label">{p.label}</figcaption>
          </figure>
        ))}
      </div>
      <p className="band-caption" data-rise>
        A hall with stone walls and steel windows, a garden for ceremonies among the trees, and long tables
        dressed the way you want them.
      </p>
    </section>
  );
}
