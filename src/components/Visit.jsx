import Img from './Img.jsx';
import { site, seasons, seasonOf, monthNames } from '../data/site.js';

const article = (word) => ('AEIOU'.includes(word[0]) ? 'an' : 'a');

export default function Visit({ month }) {
  const season = seasons[seasonOf(month)];
  const name = monthNames[month];
  // With an email set, the second link writes the enquiry; until then it opens Facebook Messenger.
  const subject = `A ${name} date at Kleinbosch`;
  const body = `Hello Kleinbosch,\n\nWe are planning an event in ${name} and would love to see the venue.\n\nNumber of guests:\nKind of event:\n`;
  const write = site.email
    ? { href: `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, label: 'Or email us' }
    : { href: site.socials.messenger, label: 'Or message us on Facebook', external: true };

  return (
    <section className="visit" id="visit" data-ground="deep">
      <Img
        className="visit-img"
        name="venue-blue-table"
        alt="A long table at Kleinbosch set with blue glasses, candles and white flowers beside the windows"
        sizes="100vw"
      />
      <div className="visit-card">
        <h2>Come and see</h2>
        <address>
          {site.name}
          <br />
          {site.town}, {site.region}
        </address>
        <dl className="visit-rows">
          <div>
            <dt>Viewings</dt>
            <dd>{site.viewings}</dd>
          </div>
          <div>
            <dt>Your month</dt>
            <dd>
              {monthNames[month]}, {season.name.toLowerCase()}
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={`tel:${site.tel}`}>{site.phone}</a>
            </dd>
          </div>
          {site.email && (
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
          )}
          <div>
            <dt>Instagram</dt>
            <dd>
              <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer">@kleinbosch</a>
            </dd>
          </div>
        </dl>
        <p className="visit-write">
          <a
            className="text-link"
            href={write.href}
            target={write.external ? '_blank' : undefined}
            rel={write.external ? 'noopener noreferrer' : undefined}
          >
            {write.label}
          </a>
        </p>
        <a className="button button-wide" href={`tel:${site.tel}`}>
          Call about {article(name)} {name} date
        </a>
      </div>
    </section>
  );
}
