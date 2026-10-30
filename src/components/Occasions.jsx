import Img from './Img.jsx';
import { occasions } from '../data/site.js';

const groups = [...new Set(occasions.map((item) => item.group))].map((group) => ({
  group,
  items: occasions.filter((item) => item.group === group)
}));

export default function Occasions() {
  return (
    <section className="chapter occasions" id="occasions" data-ground="field-2" data-rise-group>
      <div className="occasions-layout">
        <div className="occasions-intro">
          <h2 className="occasions-heading" data-rise>What we host <span>under the trees</span></h2>
          <p data-rise>Gather for a wedding, a family table, or an evening among the poplars.</p>
          <figure className="occasions-figure" data-rise>
            <Img
              name="venue-platters"
              alt="A spread of pastries and savoury snacks beside orange tulips on a table in the hall"
              sizes="(min-width: 900px) 28vw, 70vw"
            />
          </figure>
        </div>
        <div className="occasions-list" data-rise>
          {groups.map(({ group, items }) => (
            <section className="occasion-group" key={group} aria-labelledby={`occasion-${group.toLowerCase()}`}>
              <h3 id={`occasion-${group.toLowerCase()}`}>{group}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item.what}>
                    <span className="occasion-what">{item.what}</span>
                    <span className="occasion-when">{item.when}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
