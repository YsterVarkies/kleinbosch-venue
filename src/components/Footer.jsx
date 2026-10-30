import { site } from '../data/site.js';
import { chapters } from './Hero.jsx';
import { scrollToHash } from '../lib/motion.js';

export default function Footer() {
  return (
    <footer className="footer" data-ground="bone" data-rise-group>
      <div className="footer-cols">
        <div data-rise>
          <p className="footer-first">Find us</p>
          <p>{site.name}</p>
          <p>{site.town}</p>
          <p>{site.region}</p>
        </div>
        <div data-rise>
          <p className="footer-first">On this page</p>
          <ul>
            {chapters.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash(c.href);
                  }}
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div data-rise>
          <p className="footer-first">Follow</p>
          <ul>
            <li><a href={site.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href={site.socials.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href={site.socials.google} target="_blank" rel="noopener noreferrer">Google</a></li>
          </ul>
        </div>
        <div data-rise>
          <p className="footer-first">Visits</p>
          <p>{site.viewings}</p>
          <p>
            <a href={`tel:${site.tel}`}>{site.phone}</a>
          </p>
          <p>
            <a href={site.socials.messenger} target="_blank" rel="noopener noreferrer">Send us a message</a>
          </p>
        </div>
      </div>
      <div className="footer-mark">
        <svg viewBox="0 0 1000 152" role="img" aria-label="Kleinbosch">
          <text x="500" y="146" textAnchor="middle" textLength="996" lengthAdjust="spacingAndGlyphs">KLEINBOSCH</text>
        </svg>
        <p className="footer-legal">
          © {new Date().getFullYear()} {site.name}. Venue photographs supplied by Kleinbosch.
        </p>
      </div>
    </footer>
  );
}
