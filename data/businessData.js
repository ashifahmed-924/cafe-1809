/**
 * Café 1809 — single source of truth for business details and menu.
 *
 * Source: public Uber Eats listing
 * https://www.ubereats.com/au/store/cafe-1809/KVOjEGpURj6vx1GWt_8duw
 * Menu prices are DELIVERY-PLATFORM prices (AUD) and may differ in-café.
 * Dish-to-category grouping on this site is editorial and may differ from the platform.
 */

export const business = {
  name: 'Café 1809',
  shortName: '1809',
  isDemo: false,
  menuSource: 'uber-eats',
  menuSourceUrl: 'https://www.ubereats.com/au/store/cafe-1809/KVOjEGpURj6vx1GWt_8duw',
  menuDisclaimer:
    'Menu and prices shown are from the Uber Eats listing. They are delivery-platform prices and may differ in-café.',
  demoDisclaimer:
    'Demo interface only — nothing is sent or booked. To reserve or ask a question, call the café.',
  imageryNote:
    'Photography is representative stock imagery (Pexels) and not a picture of the café or its exact dishes.',
  tagline: 'Neighbourhood brunch & coffee in Glen Waverley',
  description:
    'Café 1809 is a neighbourhood café on Willow Ave, Glen Waverley, serving house-blend coffee, breakfast plates, burgers, bowls and bakery sweets.',
  address: {
    street: '34 Willow Ave',
    suburb: 'Glen Waverley',
    state: 'VIC',
    postcode: '3150',
    country: 'Australia',
    full: '34 Willow Ave, Glen Waverley VIC 3150',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=34+Willow+Ave+Glen+Waverley+VIC+3150',
  },
  phone: { display: '03 9886 4217', intl: '+61 3 9886 4217', tel: '+61398864217' },
  email: 'raya.au@yahoo.com',
  timezone: 'Australia/Melbourne',
  // day index follows JS Date.getDay(): 0 = Sunday
  hours: [
    { day: 1, label: 'Monday', open: '07:30', close: '15:30' },
    { day: 2, label: 'Tuesday', open: '07:30', close: '15:30' },
    { day: 3, label: 'Wednesday', open: '07:30', close: '15:30' },
    { day: 4, label: 'Thursday', open: '07:30', close: '15:30' },
    { day: 5, label: 'Friday', open: '07:30', close: '15:30' },
    { day: 6, label: 'Saturday', open: '08:30', close: '15:00' },
    { day: 0, label: 'Sunday', open: '08:30', close: '15:00' },
  ],
  hoursSummary: [
    { label: 'Mon–Fri', value: '7:30am – 3:30pm' },
    { label: 'Sat–Sun', value: '8:30am – 3:00pm' },
  ],
  social: {
    instagram: 'https://www.instagram.com/1809cafe/',
    facebook: 'https://www.facebook.com/cafe1809/',
  },
  order: {
    uberEats: 'https://www.ubereats.com/au/store/cafe-1809/KVOjEGpURj6vx1GWt_8duw',
    doorDash: 'https://www.doordash.com/store/caf%C3%A9-1809-glen-waverley-875749/',
    doorDashDirectUrlKnown: true,
  },
};

export const categories = [
  { id: 'featured', label: 'Featured' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'sides', label: 'Sides' },
  { id: 'hot', label: 'Hot Beverages' },
  { id: 'cold', label: 'Cold Beverages' },
  { id: 'dessert', label: 'Dessert' },
];

const item = (id, name, price, category, desc = '', extra = {}) => ({
  id,
  name,
  price,
  category,
  desc,
  ...extra,
});

/** Full list as supplied from the Uber Eats listing. */
export const menuItems = [
  // Breakfast
  item('acai-smoothie-bowl', 'Acai Smoothie Bowl', 22.5, 'breakfast', 'Topped with granola, peanut butter and fruit', { image: 'dish-acai', featured: true }),
  item('1809-breaky', '1809 Breaky', 31.5, 'breakfast', 'Eggs your way, bacon, smashed avocado, halloumi, hashbrown, mushrooms and spinach', { image: 'hero-plate', featured: true }),
  item('pesto-chilli-scrambled-eggs', 'Pesto Chilli Scrambled Eggs', 29.5, 'breakfast', 'Wild mushrooms, Persian feta, pesto, truffle oil, marinated Kezia steak, chilli oil, fried shallots on sourdough', { image: 'dish-mushroom', featured: true }),
  item('benedict', 'Benedict', 28, 'breakfast', '2 poached eggs, sriracha hollandaise, bacon, mushrooms, spinach on roti', { image: 'dish-avo-eggs' }),
  item('cinnamon-french-toast', 'Cinnamon French Toast', 26, 'breakfast', 'Raspberry puree, vanilla mascarpone, coconut syrup and fruit', { image: 'dish-french-toast', featured: true }),
  item('smashed-avocado', 'Smashed Avocado', 28, 'breakfast', 'Persian feta, pumpkin puree, cherry tomato, dukkah, halloumi, poached eggs on multigrain', { image: 'dish-smashed-avo', featured: true }),
  item('wild-mushrooms', 'Wild Mushrooms', 28.5, 'breakfast', 'Smashed avocado, poached eggs, beetroot hummus, truffle oil, chilli on soft sandwich'),
  item('egg-and-bacon-bun', 'Egg and Bacon Bun', 13.5, 'breakfast', 'Chilli fried egg, Swiss cheese and bacon', { image: 'dish-egg-bacon-bun' }),
  item('breaky-burger', 'Breaky Burger', 20.5, 'breakfast', 'Smashed avocado, tomato relish, fried egg, hash brown, bacon, hollandaise, Swiss cheese', { image: 'dish-breaky-burger' }),
  item('free-range-eggs', 'Free Range Eggs Anyway on Toast', 14.5, 'breakfast', 'Eggs your way on toast'),
  item('jam-organic-butter-toast', 'Jam and Organic Butter on Toast', 11.5, 'breakfast', ''),
  // Lunch
  item('ham-cheese-tomato-toastie', 'Ham, Cheese and Tomato Toastie', 13, 'lunch', '', { image: 'dish-toastie' }),
  item('chicken-avo-cheese-toastie', 'Chicken, Avocado and Cheese Toastie', 16.5, 'lunch', ''),
  item('mushroom-toastie', 'Mushroom Toastie', 16.5, 'lunch', ''),
  item('blat', 'BLAT', 15.5, 'lunch', ''),
  item('poke-bowl', 'Poke Bowl', 22, 'lunch', 'Cherry tomato, smashed avocado, sweet potato, edamame, spinach, carrot, Japanese sesame sauce, brown rice', { image: 'dish-poke' }),
  item('spicy-chicken-burger', 'Spicy Chicken Burger', 30, 'lunch', 'Lettuce, tomato, Swiss cheese, bacon, chipotle mayo, shoestring fries', { image: 'dish-chicken-burger' }),
  item('soft-shell-crab-burger', 'Soft Shell Crab Burger', 28, 'lunch', 'Asian slaw, chipotle mayo, peanut butter dressing, fries'),
  item('pan-fried-cuban', 'Pan Fried Cuban', 28, 'lunch', 'Slow cooked pork shoulder, mustard, pickles, ham, Swiss cheese'),
  // Sides
  item('sweet-potato-wedges', 'Sweet Potato Wedges', 10.5, 'sides'),
  item('shoestring-fries', 'Shoestring Fries', 8, 'sides'),
  item('side-halloumi', 'Halloumi', 4, 'sides', 'Add-on', { addon: true }),
  item('side-bacon', 'Bacon', 6, 'sides', 'Add-on', { addon: true }),
  item('side-mushrooms', 'Mushrooms', 6, 'sides', 'Add-on', { addon: true }),
  item('side-extra-egg', 'Extra Egg', 3, 'sides', 'Add-on', { addon: true }),
  item('side-chicken', 'Chicken', 5, 'sides', 'Add-on', { addon: true }),
  item('side-roti', 'Roti', 4, 'sides', 'Add-on', { addon: true }),
  item('side-feta', 'Feta', 3, 'sides', 'Add-on', { addon: true }),
  item('side-tomato', 'Tomato', 4, 'sides', 'Add-on', { addon: true }),
  item('side-avocado', 'Avocado', 4, 'sides', 'Add-on', { addon: true }),
  item('side-spinach', 'Spinach', 3, 'sides', 'Add-on', { addon: true }),
  item('side-chilli-oil', 'Chilli Oil', 2, 'sides', 'Add-on', { addon: true }),
  item('side-pulled-pork', 'Pulled Pork', 5, 'sides', 'Add-on', { addon: true }),
  // Hot beverages
  item('latte', 'Latte', 6, 'hot', 'House blend coffee by Niccolo', { image: 'coffee-latte', featured: true }),
  item('cappuccino', 'Cappuccino', 6, 'hot', '', { image: 'coffee-pour', featured: true }),
  item('mocha', 'Mocha', 6.5, 'hot'),
  item('flat-white', 'Flat White', 6, 'hot'),
  item('prana-chai-masala', 'Prana Chai Masala', 6.5, 'hot'),
  item('hot-chocolate', 'Hot Chocolate', 5, 'hot'),
  item('magic', 'Magic', 5, 'hot'),
  item('double-espresso', 'Double Espresso', 4, 'hot'),
  item('babyccino', 'Babyccino', 3, 'hot'),
  item('turmeric-latte', 'Turmeric Latte', 6, 'hot'),
  item('beetroot-latte', 'Beetroot Latte', 6, 'hot'),
  item('tea', 'Tea', 5, 'hot'),
  item('long-macchiato', 'Long Macchiato', 4, 'hot'),
  item('short-macchiato', 'Short Macchiato', 4, 'hot'),
  // Cold beverages
  item('iced-coffee', 'Iced Coffee', 8, 'cold', '', { image: 'drink-iced-coffee' }),
  item('milkshakes', 'Milkshakes', 9, 'cold', '', { image: 'drink-milkshake' }),
  item('iced-chocolate', 'Iced Chocolate', 8, 'cold'),
  item('iced-mocha', 'Iced Mocha', 8, 'cold'),
  // Dessert
  item('muffin', 'Muffin', 6, 'dessert'),
  item('almond-croissant', 'Almond Croissant', 7, 'dessert', '', { image: 'dessert-pastry' }),
  item('portuguese-tart', 'Portuguese Tart', 8, 'dessert', '', { image: 'dessert-counter' }),
  item('pistachio-raspberry-almond-croissant', 'Pistachio Raspberry & Almond Croissant', 7.5, 'dessert', '', { image: 'dessert-croissant' }),
  item('plain-croissant', 'Plain Croissant', 6, 'dessert'),
];

export const getItem = (id) => menuItems.find((m) => m.id === id);
export const itemsByCategory = (cat) =>
  cat === 'featured' ? menuItems.filter((m) => m.featured) : menuItems.filter((m) => m.category === cat);

/** Homepage Menu Discovery: 6 categories × 3 dishes = 18 dishes. */
export const menuDiscovery = [
  { id: 'breakfast', label: 'Breakfast', blurb: 'Eggs, avocado, roti and sourdough — the morning plates.', ids: ['1809-breaky', 'pesto-chilli-scrambled-eggs', 'cinnamon-french-toast'] },
  { id: 'lunch', label: 'Lunch', blurb: 'Bowls, burgers and a slow-cooked Cuban.', ids: ['poke-bowl', 'soft-shell-crab-burger', 'pan-fried-cuban'] },
  { id: 'sides', label: 'Sides', blurb: 'Fries, wedges and the add-ons that finish a plate.', ids: ['sweet-potato-wedges', 'shoestring-fries', 'side-halloumi'] },
  { id: 'hot', label: 'Hot Drinks', blurb: 'House blend coffee by Niccolo, chai, turmeric and beetroot lattes.', ids: ['latte', 'flat-white', 'prana-chai-masala'] },
  { id: 'cold', label: 'Cold Drinks', blurb: 'Iced coffee, iced mocha and milkshakes.', ids: ['iced-coffee', 'milkshakes', 'iced-mocha'] },
  { id: 'dessert', label: 'Bakery', blurb: 'Croissants, Portuguese tarts and muffins.', ids: ['almond-croissant', 'portuguese-tart', 'pistachio-raspberry-almond-croissant'] },
];

export const featuredDishes = [
  { id: '1809-breaky', image: 'hero-plate', kicker: 'The signature', note: 'Eggs your way with bacon, smashed avocado, halloumi, hashbrown, mushrooms and spinach — the plate the café is named around.' },
  { id: 'pesto-chilli-scrambled-eggs', image: 'dish-mushroom', kicker: 'Bold & savoury', note: 'Wild mushrooms, Persian feta, pesto and truffle oil on sourdough, finished with marinated Kezia steak, chilli oil and fried shallots.' },
  { id: 'cinnamon-french-toast', image: 'dish-french-toast', kicker: 'Sweet side', note: 'Raspberry puree, vanilla mascarpone, coconut syrup and fruit.' },
  { id: 'acai-smoothie-bowl', image: 'dish-acai', kicker: 'Light & bright', note: 'Topped with granola, peanut butter and fruit.' },
  { id: 'smashed-avocado', image: 'dish-smashed-avo', kicker: 'Brunch staple', note: 'Persian feta, pumpkin puree, cherry tomato, dukkah and halloumi with poached eggs on multigrain.' },
];

export const experienceModes = [
  { id: 'morning-brunch', title: 'Morning Brunch', jp: '朝', image: 'dish-eggs-toast', time: 'From opening', text: 'Eggs your way, benedict on roti, smashed avo and cinnamon French toast — plates built for a slow start.', picks: ['1809 Breaky', 'Benedict', 'Smashed Avocado'] },
  { id: 'coffee-lounge', title: 'Coffee Lounge', jp: '珈琲', image: 'coffee-pour', time: 'All day', text: 'House blend coffee by Niccolo, plus chai masala, turmeric and beetroot lattes for a longer sit.', picks: ['Latte', 'Flat White', 'Prana Chai Masala'] },
  { id: 'shared-table', title: 'Shared Table', jp: '卓', image: 'hero-dining', time: 'Weekends & weekdays', text: 'Bring a few people, order wedges, fries and add-ons, and let the plates land in the middle.', picks: ['Sweet Potato Wedges', 'Shoestring Fries', 'Halloumi'] },
  { id: 'a-la-carte', title: 'À La Carte', jp: '選', image: 'dish-chicken-burger', time: 'Lunch until close', text: 'Poke bowls, soft shell crab and spicy chicken burgers, and a pan-fried Cuban when you want something bigger.', picks: ['Poke Bowl', 'Soft Shell Crab Burger', 'Pan Fried Cuban'] },
];

export const journeyChapters = [
  { time: '7:30', title: 'Doors open', text: 'On weekdays the first coffees go out at 7:30am — a latte for the walk to work, or a seat by the window for a proper start.', image: 'atmosphere-room' },
  { time: '9:00', title: 'The brunch table', text: 'Eggs your way, benedict, mushrooms and avocado fill the tables. Bring a neighbour; plates are made for sharing.', image: 'dish-avo-eggs' },
  { time: '12:00', title: 'Bowls, burgers & Cubans', text: 'Lunch picks up with the poke bowl, soft shell crab burger and a pan-fried Cuban — still with a coffee on the side.', image: 'dish-poke' },
  { time: '3:00', title: 'Last orders, sweet finish', text: 'Weekends close at 3:00pm and weekdays at 3:30pm. Finish with a croissant, a Portuguese tart or an iced mocha.', image: 'dessert-croissant' },
];

export const signatureStory = {
  title: '1809 Breaky',
  price: 31.5,
  lead: 'One plate, built around eggs your way.',
  ingredients: ['Eggs your way', 'Bacon', 'Smashed avocado', 'Halloumi', 'Hashbrown', 'Mushrooms', 'Spinach'],
  left: 'hero-plate',
  right: 'dish-eggs-toast',
};

export const plateBuilder = {
  bases: [
    { id: 'free-range-eggs', label: 'Eggs anyway on toast' },
    { id: 'smashed-avocado', label: 'Smashed Avocado' },
    { id: 'benedict', label: 'Benedict' },
    { id: 'breaky-burger', label: 'Breaky Burger' },
  ],
  addons: ['side-halloumi', 'side-bacon', 'side-mushrooms', 'side-extra-egg', 'side-avocado', 'side-feta', 'side-chilli-oil', 'side-roti'],
  drinks: ['latte', 'flat-white', 'cappuccino', 'prana-chai-masala', 'turmeric-latte', 'iced-coffee'],
  pastries: ['almond-croissant', 'portuguese-tart', 'muffin', 'plain-croissant'],
};

export const values = [
  { n: '01', title: 'A neighbourhood morning', text: 'Willow Ave, Glen Waverley — a café for the regular coffee, the weekend catch-up and the one-more-plate order.' },
  { n: '02', title: 'House blend, by Niccolo', text: 'The latte is made with a house blend coffee by Niccolo, with chai masala, turmeric and beetroot lattes alongside.' },
  { n: '03', title: 'Plates made to share', text: 'Fries, wedges, halloumi, feta and chilli oil — add-ons and sides make the table bigger without a bigger bill of fuss.' },
  { n: '04', title: 'Breakfast beyond eggs', text: 'Acai bowl, poke bowl, burgers, toasties and a Cuban sit beside the classics for every kind of appetite.' },
];

export const gallery = [
  { src: 'atmosphere-room', alt: 'Bright café dining room with wooden tables', frame: 'outlined', caption: 'The room' },
  { src: 'coffee-latte', alt: 'Latte art in a black cup', frame: 'masked', caption: 'The pour' },
  { src: 'atmosphere-bar', alt: 'Baristas behind a café coffee bar', frame: 'cinematic', caption: 'The bar' },
  { src: 'dessert-counter', alt: 'Pastry counter with sweets', frame: 'grid', caption: 'The counter' },
  { src: 'atmosphere-evening', alt: 'Warm lit dining room', frame: 'asymmetric', caption: 'The light' },
  { src: 'kitchen-chefs', alt: 'Chefs plating in the kitchen', frame: 'porcelain', caption: 'The pass' },
  { src: 'atmosphere-bakery', alt: 'Bakery display and interior', frame: 'outlined', caption: 'The bakes' },
];
