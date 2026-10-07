// Converts downloaded Pexels originals (_dl, _dl2) to named WebP files in public/images.
import sharp from 'sharp';
import fs from 'node:fs';

const map = {
  'hero-dining': [2074130, 'Flat lay of coffee, pastries and shared plates'],
  'hero-plate': [566566, 'Smashed avocado, eggs and toast'],
  'dish-eggs-toast': [103124, 'Eggs on toast with a flat white'],
  'dish-acai': [1099680, 'Smoothie bowl with fresh fruit'],
  'dish-smashed-avo': [704569, 'Smashed avocado with poached egg'],
  'dish-avo-eggs': [566566, 'Avocado toast with eggs'],
  'dish-french-toast': [376464, 'Stacked pancakes with berries and syrup'],
  'dish-poke': [1640777, 'Colourful grain bowl'],
  'dish-toastie': [1633525, 'Toasted sandwich'],
  'dish-breaky-burger': [1633578, 'Breakfast burger'],
  'dish-chicken-burger': [1639557, 'Loaded burger with cheese'],
  'dish-egg-bacon-bun': [139746, 'Egg and bacon bun'],
  'dish-mushroom': [2067423, 'Greens and avocado on a dark plate'],
  'dish-bowl': [842571, 'Warm bowl with greens'],
  'dish-greens': [1213710, 'Salad with avocado and sourdough'],
  'coffee-latte': [312418, 'Latte art in a black cup'],
  'coffee-pour': [302899, 'Barista pouring latte art'],
  'drink-iced-coffee': [2615323, 'Iced coffee'],
  'drink-milkshake': [3727250, 'Chocolate milkshake'],
  'dessert-croissant': [3892469, 'Golden croissant'],
  'dessert-pastry': [2878740, 'Bakery pastry'],
  'dessert-counter': [205961, 'Pastry counter'],
  'dessert-cake': [2144200, 'Berry cake slice'],
  'atmosphere-room': [1307698, 'Cafe dining room'],
  'atmosphere-bar': [2159065, 'Cafe coffee bar'],
  'atmosphere-counter': [2253643, 'Cafe counter and seating'],
  'atmosphere-bakery': [1855214, 'Bakery display and interior'],
  'atmosphere-evening': [1581384, 'Warm lit dining room'],
  'kitchen-chefs': [3217156, 'Chefs plating in a kitchen'],
  'texture-beans': [4109743, 'Roasted coffee beans'],
};

fs.mkdirSync('public/images', { recursive: true });
for (const [name, [id]] of Object.entries(map)) {
  const src = [`_dl/${id}.jpg`, `_dl2/${id}.jpg`].find((p) => fs.existsSync(p));
  if (!src) {
    console.log('MISSING', name, id);
    continue;
  }
  const info = await sharp(src)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 76 })
    .toFile(`public/images/${name}.webp`);
  console.log(name, info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB');
}
fs.writeFileSync('scripts/image-map.json', JSON.stringify(map, null, 2));
