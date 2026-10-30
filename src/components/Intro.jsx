import Img from './Img.jsx';

export default function Intro() {
  return (
    <section className="chapter intro" id="grove" data-ground="bone" data-rise-group>
      <h2 className="intro-heading" data-rise>A little forest in Potchefstroom</h2>
      <div className="intro-text">
        <p className="intro-statement" data-rise>
          Klein bosch is Afrikaans for a little forest. Ours is a few hundred poplars in the heart of
          Potchefstroom.
        </p>
        <p className="intro-body" data-rise>
          Among them stands a hall under timber trusses and chandeliers, with stone walls and steel
          windows that look out onto the trees. We keep Kleinbosch intimate, so your people sit close
          together and the trees do most of the decorating.
        </p>
      </div>
      <figure className="intro-figure" data-rise>
        <Img
          name="venue-window-view"
          alt="Looking through a paned window at Kleinbosch into a room set with trestle tables, flowers and a chandelier"
          sizes="(min-width: 900px) 20vw, 62vw"
        />
      </figure>
      <p className="intro-note" data-rise>
        Poplars grow tall, narrow and close together. Here they come into leaf in September, turn gold
        in autumn and stand bare and white through the Highveld winter.
      </p>
    </section>
  );
}
