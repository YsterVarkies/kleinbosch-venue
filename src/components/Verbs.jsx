import Img from './Img.jsx';

const stages = [
  {
    verb: 'Walk',
    text: 'Come out to Potchefstroom and walk the rows with us before you choose a date.',
    img: 'venue-chandeliers',
    alt: 'The Kleinbosch hall dressed for a reception beneath its chandeliers'
  },
  {
    verb: 'Plan',
    text: 'Choose your month, your table plan and your people. We will tell you what the trees will be doing.',
    img: 'venue-dried-flowers',
    alt: 'A close view of a dinner table set with glassware, flowers and candles, with the hall softly out of focus'
  },
  {
    verb: 'Gather',
    text: 'On the day, the room is yours. Everyone you asked for, at one long table.',
    img: 'venue-blue-table',
    alt: 'A long table set with blue glasses, blue candles and white flowers in front of steel windows, with string lights outside'
  }
];

// Full-screen scenes; each verb holds the middle of the screen while its image passes behind it.
export default function Verbs() {
  return (
    <section className="verbs" aria-label="How a day at Kleinbosch comes together" data-ground="deep">
      {stages.map((s) => (
        <article className="verb-panel" key={s.verb}>
          <Img name={s.img} alt={s.alt} sizes="100vw" className="verb-img" />
          <div className="verb-track">
            <div className="verb-sticky">
              <h2 className="verb">{s.verb}</h2>
            </div>
          </div>
          <p className="verb-text">{s.text}</p>
        </article>
      ))}
    </section>
  );
}
