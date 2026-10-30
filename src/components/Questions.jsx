import Img from './Img.jsx';
import { site, questions } from '../data/site.js';

export default function Questions() {
  return (
    <section className="chapter questions" id="questions" data-ground="surface" data-rise-group>
      <div className="questions-text">
        <h2 data-rise>Good to know</h2>
        <dl className="facts" data-rise>
          <div>
            <dt>Where</dt>
            <dd>{site.town}, {site.region}</dd>
          </div>
          <div>
            <dt>From Johannesburg</dt>
            <dd>{site.fromJoburg}</dd>
          </div>
          <div>
            <dt>Viewings</dt>
            <dd>{site.viewings}</dd>
          </div>
        </dl>
        <div className="accordion" data-rise>
          {questions.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
        <div className="questions-actions" data-rise>
          <a className="button" href={`tel:${site.tel}`}>
            Call {site.phone}
          </a>
          <a className="text-link" href={site.socials.messenger} target="_blank" rel="noopener noreferrer">
            Or message us on Facebook
          </a>
        </div>
      </div>
      <div className="questions-pictures">
        <Img
          className="q-tall"
          name="venue-hall-winter-trees"
          alt="Long tables with greenery, candles and flowers in the Kleinbosch hall, beside windows looking onto the grove"
          sizes="(min-width: 900px) 46vw, 100vw"
        />
        <Img
          className="q-square"
          name="venue-stone-wall-table"
          alt="Gold candlesticks, green glasses and pink napkins on a table against a stone wall"
          sizes="(min-width: 900px) 16vw, 38vw"
        />
      </div>
    </section>
  );
}
