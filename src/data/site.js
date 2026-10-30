// Everything the owner might update lives here.
// VERIFIED came from Kleinbosch's own Instagram and Facebook pages (October 2026).
// SAMPLE is written for the design and must be confirmed with the owner before launch.

export const site = {
  name: 'Kleinbosch Venue', // VERIFIED
  town: 'Potchefstroom', // VERIFIED
  region: 'North West, South Africa',
  lat: -26.7145,
  lng: 27.097,
  // VERIFIED from the Instagram bio: "an intimate venue based in the heart of Potchefstroom.
  // Set amongst hundreds of poplar trees".
  summary: 'An intimate venue for weddings and gatherings, set among hundreds of poplar trees in the heart of Potchefstroom.',
  email: '', // Not known yet: add the venue's email to show it on the visit card.
  phone: '082 414 9107', // VERIFIED, supplied directly by the owner
  tel: '+27824149107',
  viewings: 'By appointment', // SAMPLE
  fromJoburg: 'About 1 h 30 min by road', // approximate driving time from Johannesburg
  socials: {
    instagram: 'https://www.instagram.com/kleinbosch/',
    facebook: 'https://www.facebook.com/kleinbosch/',
    messenger: 'https://m.me/kleinbosch',
    google: 'https://share.google/FJqXjMd7CtW90tGFe'
  }
};

// The poplars through a South African year. Months are 0-based (0 = January).
export const seasons = {
  spring: {
    name: 'Spring',
    months: [8, 9, 10],
    span: 'Sep to Nov',
    trees: 'New leaves, light green and thin enough for the sun to come through.'
  },
  summer: {
    name: 'Summer',
    months: [11, 0, 1],
    span: 'Dec to Feb',
    trees: 'Full, deep shade, and afternoon thunderstorms rolling in over the Highveld.'
  },
  autumn: {
    name: 'Autumn',
    months: [2, 3, 4],
    span: 'Mar to May',
    trees: 'The poplars turn gold from the top down, and the leaves start to fall.'
  },
  winter: {
    name: 'Winter',
    months: [5, 6, 7],
    span: 'Jun to Aug',
    trees: 'Bare white trunks, dry gold grass, clear skies and cold nights.'
  }
};

export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const seasonOf = (month) => Object.keys(seasons).find((k) => seasons[k].months.includes(month));

// SAMPLE: the occasion list and the best seasons for each.
export const occasions = [
  { group: 'Weddings', what: 'Ceremony under the poplars', when: 'Best in spring and autumn' },
  { group: 'Weddings', what: 'Reception and long-table dinner', when: 'All year' },
  { group: 'Weddings', what: 'Small weddings and elopements', when: 'All year' },
  { group: 'Celebrations', what: 'Engagements and anniversaries', when: 'All year' },
  { group: 'Celebrations', what: 'Birthdays and family lunches', when: 'Best in summer shade' },
  { group: 'Celebrations', what: 'Baby and bridal showers', when: 'All year' },
  { group: 'Business', what: 'Year-end functions', when: 'November and December' },
  { group: 'Business', what: 'Workshops and strategy days', when: 'Weekdays, all year' },
  { group: 'Evenings', what: 'Dinners by firelight', when: 'Best in winter' },
  { group: 'Evenings', what: 'Live music and sundowners', when: 'Spring to autumn' }
];

// SAMPLE answers: confirm every one with the owner.
export const questions = [
  {
    q: 'How many guests can Kleinbosch take?',
    a: 'Kleinbosch is an intimate venue, made for smaller weddings and gatherings. Tell us your number and we will tell you how the grove sets up for it.'
  },
  {
    q: 'Can we bring our own caterer and suppliers?',
    a: 'Ask us about your caterer, florist and band when you enquire. We are happy to recommend people who know the venue.'
  },
  {
    q: 'What happens if it rains?',
    a: 'Summer storms on the Highveld usually pass by evening. Ask us about cover for the tables and the ceremony when you plan your date.'
  },
  {
    q: 'Can we see the venue first?',
    a: 'Yes. Viewings are by appointment; send us a message and we will find a time for you to walk the rows.'
  },
  {
    q: 'Where can our guests stay?',
    a: 'Potchefstroom has guesthouses close by. We can send you a list when you book.'
  }
];
