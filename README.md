# Kleinbosch Venue website

A one-page site for **Kleinbosch Venue**, an intimate venue among hundreds of poplar trees in
Potchefstroom. Built with React 19 and Vite, using GSAP with ScrollTrigger, Lenis smooth scrolling,
and split-text entrance motion.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:5190. `npm run build` writes a static site to `dist/`, and `npm run preview`
serves that build on port 4190.

## What is on the page

| Section | What it does |
| --- | --- |
| Hero | A venue photograph with a month picker and Potchefstroom sunset time, calculated in `src/lib/sun.js`. |
| The grove | What the name means (Afrikaans for "little forest"). |
| The venue | Four photographs of the hall and the grove in a band of unequal panels. |
| Occasions | What the venue hosts, with the best time of year for each. |
| Walk, Plan, Gather | Three full-screen scenes, each with one word held in the middle of the screen. |
| From the grove to the table | Three venue photographs rise into place as you scroll. |
| Good to know | Practical facts and questions. |
| Come and see | The visit card, with the month you picked. |

## Change the content

Everything editable is in `src/data/site.js`. Entries marked `SAMPLE` were written for the design and
need the owner's confirmation; see `CONTENT-SOURCES.md`. Set `email` there to make the enquiry button
write an email. Until then it opens Facebook Messenger (m.me/kleinbosch).

## Pictures

The site uses the venue photographs and logo supplied in `Images/`. `npm run images` rebuilds the
WebP copies in `public/img/` from `Images/` and the remaining source images in `assets/`.

To add or replace a venue photo, put it in `Images/`, map it in `suppliedVenuePhotos` in
`scripts/optimise-images.mjs`, update its dimensions in `src/components/Img.jsx`, then run
`npm run images`.

## Motion and accessibility

`prefers-reduced-motion` turns off smooth scrolling, split-text and entrance animations, and the rising
gallery (it shows its end state). The hero uses the venue photograph on every device. Every control has
a visible focus state, and the month buttons are real buttons with `aria-pressed`.
